"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";

export default function GoogleCalendarForm() {
  const { data: session, status } = useSession();
  const [calendarEmbedCode, setCalendarEmbedCode] = useState("");

  const fetchCalendarEmbedCode = useCallback(async () => {
    if (session) {
      const userRef = doc(db, "users", session.user?.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setCalendarEmbedCode(docSnap.data().calendarEmbedCode || "");
      }
    }
  }, [session]);

  useEffect(() => {
    fetchCalendarEmbedCode();
  }, [fetchCalendarEmbedCode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (session) {
      const userRef = doc(db, "users", session.user?.uid);
      await setDoc(userRef, { calendarEmbedCode }, { merge: true });
      await fetchCalendarEmbedCode();
      setCalendarEmbedCode("");
    }
  };

  if (status === "loading") {
    return <>Loading...</>;
  }

  return (
    <div className="py-1 flex flex-col">
      <a
        className="text-2xl text-blue-700 text-center"
        href="https://www.howtogeek.com/781315/how-to-embed-google-calendar-on-a-website-or-blog/"
        target="_blank"
        rel="noopener noreferrer"
      >
        -- Guide to Embeding Google Calandar Link --
      </a>
      <form className="" onSubmit={handleSubmit}>
        <label className="text-2xl">
          Google Calendar Embed Code:
          <input
            className="p-2 mr-2 border rounded"
            type="string"
            value={calendarEmbedCode}
            onChange={(e) => setCalendarEmbedCode(e.target.value)}
            required
          />
        </label>
        <button
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          type="submit"
        >
          Save Embed Code
        </button>
      </form>
      <label className="text-3xl text-left">Google Calendar</label>
    </div>
  );
}
