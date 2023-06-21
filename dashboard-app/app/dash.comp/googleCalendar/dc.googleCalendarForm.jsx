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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Google Calendar EmbedCode:
        <input
          type="string"
          value={calendarEmbedCode}
          onChange={(e) => setCalendarEmbedCode(e.target.value)}
          required
        />
      </label>
      <button className="px-4" type="submit">
        Save
      </button>
    </form>
  );
}
