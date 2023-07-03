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

export default function TodoList() {
  const { data: session, status } = useSession();
  const [toDoLists, setToDoLists] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setToDoLists(docSnap.data().toDoList || []);
        }
      }
    };
    fetchList();
  }, [session]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  const addList = async (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      toDoList: arrayUnion({ listName: newListName, tasks: [] }),
    });
    setToDoLists((prevLists) => [
      ...prevLists,
      { listName: newListName, tasks: [] },
    ]);
    setNewListName("");
  };

  const addTask = async (event) => {
    event.preventDefault();
    if (selectedListIndex === null) return;
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    updatedList[selectedListIndex].tasks.push(newTask);
    await setDoc(userRef, { toDoList: updatedList }, { merge: true });
    setToDoLists(updatedList);
    setNewTask("");
  };

  const deleteList = async (index) => {
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    updatedList.splice(index, 1);
    await setDoc(userRef, { toDoList: updatedList }, { merge: true });
    setToDoLists(updatedList);
    if (selectedListIndex !== null) {
      if (selectedListIndex === index) {
        setSelectedListIndex(null);
      } else if (selectedListIndex > index) {
        setSelectedListIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const deleteTask = async (taskIndex) => {
    if (selectedListIndex === null) return;
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    updatedList[selectedListIndex].tasks.splice(taskIndex, 1);
    await setDoc(userRef, { toDoList: updatedList }, { merge: true });
    setToDoLists(updatedList);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    if (selectedListIndex === null) return;
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    const [reorderedItem] = updatedList[selectedListIndex].tasks.splice(
      result.source.index,
      1
    );
    updatedList[selectedListIndex].tasks.splice(
      result.destination.index,
      0,
      reorderedItem
    );
    await setDoc(userRef, { toDoList: updatedList }, { merge: true });
    setToDoLists(updatedList);
  };

  return (
    <div className="py-8 flex flex-row">
      <div className="w-1/2 px-4 flex flex-col">
        <h1 className="text-3xl">To-Do List</h1>
        <form onSubmit={addList} className="my-2 flex flex-row">
          <input
            type="text"
            className="p-2 mr-2 border rounded h-16"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list"
            required
          />
          <button type="submit" className="p-2 text-white bg-blue-500 rounded">
            Add List
          </button>
        </form>

        <div className="">
          <ul className="">
            {toDoLists.map((list, index) => (
              <li
                key={index}
                className={
                  index === selectedListIndex
                    ? "my-1 px-4 flex container bg-blue-200 rounded"
                    : "my-1 px-4 flex container bg-gray-200 rounded"
                }
              >
                <button
                  className="flex container rounded"
                  onClick={() => setSelectedListIndex(index)}
                >
                  {list.listName}
                </button>
                <button
                  className="ml-4 text-red-500 px-4"
                  onClick={() => deleteList(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/2 px-4 flex flex-col">
        {selectedListIndex !== null && (
          <div className="">
            <h2 className="text-2xl">
              Tasks for {toDoLists[selectedListIndex].listName}
            </h2>

            <form onSubmit={addTask} className="my-2 flex flex-row">
              <input
                type="text"
                className="p-2 mr-2 border rounded h-16"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New task"
                required
              />
              <button
                type="submit"
                className="p-2 text-white bg-blue-500 rounded"
              >
                Add Task
              </button>
            </form>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {toDoLists[selectedListIndex].tasks.map((task, index) => (
                      <Draggable key={task} draggableId={task} index={index}>
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="my-1 px-4 flex justify-between bg-gray-200 rounded"
                          >
                            {task}
                            <button
                              onClick={() => deleteTask(index)}
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
        )}
      </div>
    </div>
  );
}
