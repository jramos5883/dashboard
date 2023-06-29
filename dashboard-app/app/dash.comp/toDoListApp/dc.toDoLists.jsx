"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";

function ToDoLists({
  toDoLists,
  setToDoLists,
  selectedListIndex,
  setSelectedListIndex,
}) {
  const { data: session } = useSession();
  const [newList, setNewList] = useState("");

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
  }, [session, setToDoLists]);

  const addList = async (event) => {
    event.preventDefault();
    const newListData = { listName: newList, tasks: [] };
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      toDoLists: arrayUnion(newListData),
    });
    setToDoLists((prevLists) => [...prevLists, newListData]);
    setNewList("");
  };

  const deleteList = async (index) => {
    const listToDelete = toDoLists[index];
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      toDoLists: arrayRemove(listToDelete),
    });
    setToDoLists((prevLists) => prevLists.filter((list, i) => i !== index));
    setSelectedListIndex(null); // Reset selected list
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const [reorderedList] = toDoLists.splice(result.source.index, 1);
    toDoLists.splice(result.destination.index, 0, reorderedList);
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists: toDoLists }, { merge: true });
    setToDoLists([...toDoLists]);
  };

  return (
    <div className="w-1/2">
      <h1 className="text-2xl">To-Do Lists</h1>
      <form onSubmit={addList} className="my-2">
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="New list"
          required
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Add
        </button>
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="toDoLists">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {toDoLists.map((list, index) => (
                <Draggable
                  key={list.listName}
                  draggableId={list.listName}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="my-1"
                      onClick={() => setSelectedListIndex(index)}
                      style={{
                        backgroundColor:
                          selectedListIndex === index ? "lightgray" : "white",
                      }}
                    >
                      {list.listName}
                      <button
                        onClick={() => deleteList(index)}
                        className="ml-4 text-red-500"
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

export default ToDoLists;
