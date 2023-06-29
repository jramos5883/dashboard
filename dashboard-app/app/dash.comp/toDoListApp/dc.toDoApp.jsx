"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";
import ToDoLists from "./dc.toDoLists";
import TaskList from "./dc.taskList";

function ToDoApp() {
  const { data: session } = useSession();
  const [toDoLists, setToDoLists] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setToDoLists(docSnap.data().toDoLists || []);
        }
      }
    };

    fetchLists();
  }, [session]);

  return (
    <div className="py-4 flex w-full">
      <ToDoLists
        toDoLists={toDoLists}
        setToDoLists={setToDoLists}
        selectedListIndex={selectedListIndex}
        setSelectedListIndex={setSelectedListIndex}
      />
      <TaskList
        selectedListIndex={selectedListIndex}
        toDoLists={toDoLists}
        setToDoLists={setToDoLists}
      />
    </div>
  );
}

export default ToDoApp;
