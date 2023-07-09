"use client";

import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/app/utils/firebase/firebase.utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TodoList() {
  const { data: session, status } = useSession();
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [newList, setNewList] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      if (session) {
        const q = query(collection(db, "users", session.user?.uid, "lists"));
        const querySnapshot = await getDocs(q);
        let lists = [];
        querySnapshot.forEach((doc) => {
          lists.push({ id: doc.id, ...doc.data() });
        });
        lists.sort((a, b) => new Date(a.created) - new Date(b.created));
        setLists(lists);
        if (lists.length > 0) setActiveList(lists[0].id);
      }
    };
    fetchLists();
  }, [session]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (session && activeList) {
        const q = query(
          collection(
            db,
            "users",
            session.user?.uid,
            "lists",
            activeList,
            "tasks"
          )
        );
        const querySnapshot = await getDocs(q);
        let tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        const listIndex = lists.findIndex((list) => list.id === activeList);
        let newLists = [...lists];
        newLists[listIndex] = { ...newLists[listIndex], tasks: tasks };
        setLists(newLists);
      }
    };
    fetchTasks();
  }, [session, activeList, lists]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  const addList = async (event) => {
    event.preventDefault();
    const listRef = collection(db, "users", session.user?.uid, "lists");
    const newListData = {
      name: newList,
      created: new Date().toISOString(),
    };
    const docRef = await addDoc(listRef, newListData);
    setLists([...lists, { id: docRef.id, ...newListData }]);
    setNewList("");
  };

  const addItem = async (event) => {
    event.preventDefault();
    const taskRef = collection(
      db,
      "users",
      session.user?.uid,
      "lists",
      activeList,
      "tasks"
    );
    const newItemData = {
      name: newItem,
    };
    const docRef = await addDoc(taskRef, newItemData);
    const listIndex = lists.findIndex((list) => list.id === activeList);
    let newLists = [...lists];
    let tasks = newLists[listIndex].tasks || [];
    tasks.push({ id: docRef.id, ...newItemData });
    newLists[listIndex] = { ...newLists[listIndex], tasks: tasks };
    setLists(newLists);
    setNewItem("");
  };

  const deleteList = async (listId) => {
    const listRef = doc(db, "users", session.user?.uid, "lists", listId);
    await deleteDoc(listRef);

    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    if (activeList === listId) {
      setActiveList(null);
    }
  };

  const deleteItem = async (itemId) => {
    const itemRef = doc(
      db,
      "users",
      session.user?.uid,
      "lists",
      activeList,
      "tasks",
      itemId
    );
    await deleteDoc(itemRef);
    const listIndex = lists.findIndex((list) => list.id === activeList);
    let newLists = [...lists];
    newLists[listIndex].tasks = newLists[listIndex].tasks.filter(
      (task) => task.id !== itemId
    );
    setLists(newLists);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const listIndex = lists.findIndex((list) => list.id === activeList);
    const [reorderedItem] = lists[listIndex].tasks.splice(
      result.source.index,
      1
    );
    lists[listIndex].tasks.splice(result.destination.index, 0, reorderedItem);
    setLists([...lists]);
  };

  return (
    <div className="flex py-8">
      <div className="w-1/2 px-4">
        <h1 className="text-3xl">Todo Lists</h1>
        <form onSubmit={addList} className="my-2 flex flex-row">
          <input
            type="text"
            className="p-2 mr-2 border rounded"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            placeholder="New list"
            required
          />
          <button
            type="submit"
            className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        <ul>
          {lists.map((list, index) => (
            <li
              key={list.id}
              className={
                activeList === list.id
                  ? "my-1 px-4 flex justify-between bg-blue-300 rounded hover:bg-blue-300"
                  : "my-1 px-4 flex justify-between bg-gray-200 rounded hover:bg-gray-100"
              }
              onClick={() => setActiveList(list.id)}
            >
              {list.name}
              <button
                className="ml-4 text-red-500 px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(list.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeList && (
        <div className="w-1/2 px-4">
          <h1 className="text-3xl">Tasks</h1>
          <form onSubmit={addItem} className="my-2 flex flex-row">
            <input
              type="text"
              className="p-2 mr-2 border rounded"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="New task"
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
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {lists
                    .find((list) => list.id === activeList)
                    ?.tasks?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="my-1 px-4 flex justify-between bg-gray-200 rounded hover:bg-gray-100"
                          >
                            {task.name}
                            <button
                              className="ml-4 text-red-500 px-4"
                              onClick={() => deleteItem(task.id)}
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
  );
}
