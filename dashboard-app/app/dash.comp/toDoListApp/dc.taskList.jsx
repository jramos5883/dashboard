"use client";

import React, { useState } from "react";
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

function TaskList({ selectedListIndex, toDoLists, setToDoLists }) {
  const { data: session } = useSession();
  const [newTask, setNewTask] = useState("");

  const addTask = async (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    updatedList[selectedListIndex].tasks.push(newTask);
    await updateDoc(userRef, {
      toDoLists: updatedList,
    });
    setToDoLists(updatedList);
    setNewTask("");
  };

  const deleteTask = async (taskIndex) => {
    const userRef = doc(db, "users", session.user?.uid);
    const updatedList = [...toDoLists];
    updatedList[selectedListIndex].tasks.splice(taskIndex, 1);
    await updateDoc(userRef, {
      toDoLists: updatedList,
    });
    setToDoLists(updatedList);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const updatedList = [...toDoLists];
    const [reorderedTask] = updatedList[selectedListIndex].tasks.splice(
      result.source.index,
      1
    );
    updatedList[selectedListIndex].tasks.splice(
      result.destination.index,
      0,
      reorderedTask
    );
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists: updatedList }, { merge: true });
    setToDoLists(updatedList);
  };

  if (selectedListIndex === null) {
    return null; // or return some placeholder component
  }

  return (
    <div className="w-1/2">
      <h1 className="text-2xl">{toDoLists[selectedListIndex].listName}</h1>
      <form onSubmit={addTask} className="my-2">
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          required
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Add
        </button>
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {toDoLists[selectedListIndex].tasks.map((task, index) => (
                <Draggable key={task} draggableId={task} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="my-1"
                    >
                      {task}
                      <button
                        onClick={() => deleteTask(index)}
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

export default TaskList;
