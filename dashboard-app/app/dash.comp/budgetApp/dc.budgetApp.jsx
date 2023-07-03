"use client";

import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/app/utils/firebase/firebase.utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Budget() {
  const { data: session, status } = useSession();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    dueDate: "",
    amount: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      if (session) {
        const userRef = doc(db, "users", session.user?.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setExpenses(docSnap.data().expenses || []);
        }
      }
    };
    fetchExpenses();
  }, [session]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  const addExpense = async (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      expenses: arrayUnion(newExpense),
    });
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setNewExpense({ name: "", dueDate: "", amount: "" });
  };

  const deleteExpense = async (expense) => {
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      expenses: arrayRemove(expense),
    });
    setExpenses((prevExpenses) => prevExpenses.filter((e) => e !== expense));
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const [reorderedItem] = expenses.splice(result.source.index, 1);
    expenses.splice(result.destination.index, 0, reorderedItem);
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, { expenses: expenses }, { merge: true });
    setExpenses([...expenses]);
  };

  const totalExpense = expenses.reduce(
    (sum, { amount }) => sum + parseFloat(amount || 0),
    0
  );

  return (
    <div className="py-8">
      <h1 className="text-3xl">Budget</h1>
      <form onSubmit={addExpense} className="my-2">
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newExpense.name}
          onChange={(e) =>
            setNewExpense({ ...newExpense, name: e.target.value })
          }
          placeholder="< Bill / Subscription >"
          required
        />
        <input
          type="date"
          className="p-2 mr-2 border rounded"
          value={newExpense.dueDate}
          onChange={(e) =>
            setNewExpense({ ...newExpense, dueDate: e.target.value })
          }
          required
        />
        <input
          type="text"
          className="p-2 mr-2 border rounded"
          value={newExpense.amount}
          onChange={(e) => {
            const re = /^[0-9]+[.]?[0-9]*$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setNewExpense({ ...newExpense, amount: e.target.value });
            }
          }}
          placeholder="Amount"
          required
        />
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Add
        </button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="expenses">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {expenses.map((expense, index) => (
                <Draggable
                  key={expense.name}
                  draggableId={expense.name}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="my-1 flex justify-between bg-gray-200 rounded"
                    >
                      <span className="w-1/4 p-2">{expense.name}</span>
                      <span className="w-1/4 p-2 text-right">
                        {expense.dueDate}
                      </span>
                      <span className="w-1/4 p-2 text-right">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </span>
                      <span className="w-1/4 p-2 text-right">
                        <button
                          onClick={() => deleteExpense(expense)}
                          className="text-red-500 px-4"
                        >
                          Delete
                        </button>
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <h2 className="text-2xl py-4 text-right">
        Total Monthly Expenses: ${totalExpense.toFixed(2)}
      </h2>
    </div>
  );
}
