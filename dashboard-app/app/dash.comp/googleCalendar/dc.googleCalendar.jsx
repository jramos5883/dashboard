"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";

export default function GoogleCalendar() {
  const { data: session, status } = useSession();
  const [calendarEmbedCode, setCalendarEmbedCode] = useState("");

  useEffect(() => {
    const fetchCalendarEmbedCode = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setCalendarEmbedCode(docSnap.data().calendarEmbedCode || "");
        }
      }
    };
    fetchCalendarEmbedCode();
  }, [session]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (!calendarEmbedCode) {
    return null;
  }

  return (
    <div
      className="py-8"
      dangerouslySetInnerHTML={{ __html: calendarEmbedCode }}
    />
  );
}
