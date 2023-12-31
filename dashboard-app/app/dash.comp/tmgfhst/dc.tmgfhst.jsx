"use client";

import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/app/utils/firebase/firebase.utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Tmgfhst() {
  const { data: session, status } = useSession();
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setList(docSnap.data().tmgfhstList || []);
        }
      }
    };
    fetchList();
  }, [session]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  const addItem = async (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      tmgfhstList: arrayUnion(newItem),
    });
    setList((prevList) => [...prevList, newItem]);
    setNewItem("");
  };

  const deleteItem = async (item) => {
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      tmgfhstList: arrayRemove(item),
    });
    setList((prevList) => prevList.filter((i) => i !== item));
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const [reorderedItem] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, reorderedItem);
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { tmgfhstList: list }, { merge: true });
    setList([...list]);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl">TMGFHST List</h1>
      <form onSubmit={addItem} className="my-2">
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
          required
        />
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="my-1 px-4 flex justify-between bg-gray-200 rounded hover:bg-gray-100"
                    >
                      {item}
                      <button
                        onClick={() => deleteItem(item)}
                        className="ml-4 text-red-500 px-4"
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
