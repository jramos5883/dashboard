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

export default function ShoppingList() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setList(docSnap.data().shoppingList || []);
        }
      }
    };
    fetchList();
  }, [session]);

  const addItem = async (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      shoppingList: arrayUnion(newItem),
    });
    setList((prevList) => [...prevList, newItem]);
    setNewItem("");
  };

  const deleteItem = async (item) => {
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      shoppingList: arrayRemove(item),
    });
    setList((prevList) => prevList.filter((i) => i !== item));
  };

  return (
    <div className="py-4">
      <h1 className="text-2xl">Shopping List</h1>
      <form onSubmit={addItem} className="my-2">
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
          required
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Add
        </button>
      </form>

      <ul>
        {list.map((item, index) => (
          <li key={index} className="my-1">
            {item}
            <button
              onClick={() => deleteItem(item)}
              className="ml-4 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
