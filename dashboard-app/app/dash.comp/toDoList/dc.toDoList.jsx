"use client";

// import React, { useState, useEffect } from "react";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { useSession } from "next-auth/react";
// import { db } from "@/app/utils/firebase/firebase.utils";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// export default function ToDoList() {
//   const { data: session } = useSession();
//   const [toDoLists, setToDoLists] = useState([]);
//   const [selectedListIndex, setSelectedListIndex] = useState(null);
//   const [newListName, setNewListName] = useState("");
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     const fetchList = async () => {
//       if (session) {
//         const userRef = doc(db, "users", session.user?.uid);
//         const docSnap = await getDoc(userRef);
//         if (docSnap.exists()) {
//           setToDoLists(docSnap.data().toDoList || []);
//         }
//       }
//     };
//     fetchList();
//   }, [session]);

//   const addList = async (event) => {
//     event.preventDefault();
//     const userRef = doc(db, "users", session.user?.uid);
//     await updateDoc(userRef, {
//       toDoList: arrayUnion({ listName: newListName, tasks: [] }),
//     });
//     setToDoLists((prevLists) => [
//       ...prevLists,
//       { listName: newListName, tasks: [] },
//     ]);
//     setNewListName("");
//   };

//   const addTask = async (event) => {
//     event.preventDefault();
//     if (selectedListIndex === null) return;
//     const userRef = doc(db, "users", session.user?.uid);
//     const updatedList = [...toDoLists];
//     updatedList[selectedListIndex].tasks.push(newTask);
//     await setDoc(userRef, { toDoList: updatedList }, { merge: true });
//     setToDoLists(updatedList);
//     setNewTask("");
//   };

//   const deleteList = async (index) => {
//     const userRef = doc(db, "users", session.user?.uid);
//     const updatedList = [...toDoLists];
//     updatedList.splice(index, 1);
//     await setDoc(userRef, { toDoList: updatedList }, { merge: true });
//     setToDoLists(updatedList);
//     if (selectedListIndex === index) setSelectedListIndex(null);
//   };

//   const deleteTask = async (taskIndex) => {
//     if (selectedListIndex === null) return;
//     const userRef = doc(db, "users", session.user?.uid);
//     const updatedList = [...toDoLists];
//     updatedList[selectedListIndex].tasks.splice(taskIndex, 1);
//     await setDoc(userRef, { toDoList: updatedList }, { merge: true });
//     setToDoLists(updatedList);
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     if (selectedListIndex === null) return;
//     const userRef = doc(db, "users", session.user?.uid);
//     const updatedList = [...toDoLists];
//     const [reorderedItem] = updatedList[selectedListIndex].tasks.splice(
//       result.source.index,
//       1
//     );
//     updatedList[selectedListIndex].tasks.splice(
//       result.destination.index,
//       0,
//       reorderedItem
//     );
//     await setDoc(userRef, { toDoList: updatedList }, { merge: true });
//     setToDoLists(updatedList);
//   };

//   return (
//     <div className="py-4">
//       <h1 className="text-2xl">To-Do List</h1>
//       <form onSubmit={addList} className="my-2">
//         <input
//           type="text"
//           className="p-2 mr-2 border rounded"
//           value={newListName}
//           onChange={(e) => setNewListName(e.target.value)}
//           placeholder="New list"
//           required
//         />
//         <button type="submit" className="p-2 text-white bg-blue-500 rounded">
//           Add List
//         </button>
//       </form>

//       <div style={{ display: "flex" }}>
//         <div>
//           <h2>Lists</h2>
//           <ul>
//             {toDoLists.map((list, index) => (
//               <li key={index}>
//                 <button onClick={() => setSelectedListIndex(index)}>
//                   {list.listName}
//                 </button>
//                 <button onClick={() => deleteList(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {selectedListIndex !== null && (
//           <div>
//             <h2>Tasks for {toDoLists[selectedListIndex].listName}</h2>
//             <form onSubmit={addTask}>
//               <input
//                 type="text"
//                 className="p-2 mr-2 border rounded"
//                 value={newTask}
//                 onChange={(e) => setNewTask(e.target.value)}
//                 placeholder="New task"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="p-2 text-white bg-blue-500 rounded"
//               >
//                 Add Task
//               </button>
//             </form>
//             <DragDropContext onDragEnd={handleDragEnd}>
//               <Droppable droppableId="list">
//                 {(provided) => (
//                   <ul {...provided.droppableProps} ref={provided.innerRef}>
//                     {toDoLists[selectedListIndex].tasks.map((task, index) => (
//                       <Draggable key={task} draggableId={task} index={index}>
//                         {(provided) => (
//                           <li
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             ref={provided.innerRef}
//                             className="my-1"
//                           >
//                             {task}
//                             <button
//                               onClick={() => deleteTask(index)}
//                               className="ml-4 text-red-500"
//                             >
//                               Delete
//                             </button>
//                           </li>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </ul>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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

export default function ToDoList() {
  const { data: session } = useSession();
  const [toDoLists, setToDoLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newTask, setNewTask] = useState("");
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

  const addList = async (event) => {
    event.preventDefault();
    const newList = { listName: newListName, tasks: [] };
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      toDoLists: arrayUnion(newList),
    });
    setToDoLists((prevLists) => [...prevLists, newList]);
    setNewListName("");
  };

  const deleteList = async (index) => {
    const listToDelete = toDoLists[index];
    const userRef = doc(db, "users", session.user?.uid);
    await updateDoc(userRef, {
      toDoLists: arrayRemove(listToDelete),
    });
    setToDoLists((prevLists) => prevLists.filter((list, i) => i !== index));
    if (index === selectedListIndex) setSelectedListIndex(null);
  };

  const handleListDragEnd = async (result) => {
    if (!result.destination) return;
    const [reorderedList] = toDoLists.splice(result.source.index, 1);
    toDoLists.splice(result.destination.index, 0, reorderedList);
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists }, { merge: true });
    setToDoLists([...toDoLists]);
  };

  const addTask = async (event) => {
    event.preventDefault();
    const newToDoLists = [...toDoLists];
    newToDoLists[selectedListIndex].tasks.push(newTask);
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists: newToDoLists }, { merge: true });
    setToDoLists(newToDoLists);
    setNewTask("");
  };

  const deleteTask = async (taskIndex) => {
    const newToDoLists = [...toDoLists];
    newToDoLists[selectedListIndex].tasks.splice(taskIndex, 1);
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists: newToDoLists }, { merge: true });
    setToDoLists(newToDoLists);
  };

  const handleTaskDragEnd = async (result) => {
    if (!result.destination) return;
    const [reorderedTask] = toDoLists[selectedListIndex].tasks.splice(
      result.source.index,
      1
    );
    toDoLists[selectedListIndex].tasks.splice(
      result.destination.index,
      0,
      reorderedTask
    );
    const userRef = doc(db, "users", session.user?.uid);
    await setDoc(userRef, { toDoLists }, { merge: true });
    setToDoLists([...toDoLists]);
  };

  return (
    <div className="py-4 flex w-full">
      <div className="w-1/2">
        <h1 className="text-2xl">To-Do Lists</h1>
        <form onSubmit={addList} className="my-2">
          <input
            type="text"
            className="p-2 mr-2 border rounded"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list"
            required
          />
          <button type="submit" className="p-2 text-white bg-blue-500 rounded">
            Add
          </button>
        </form>

        <DragDropContext onDragEnd={handleListDragEnd}>
          <Droppable droppableId="lists">
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
                            index === selectedListIndex
                              ? "#ddd"
                              : "transparent",
                        }}
                      >
                        {list.listName}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteList(index);
                          }}
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

      {selectedListIndex !== null && (
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
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Add
            </button>
          </form>

          <DragDropContext onDragEnd={handleTaskDragEnd}>
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
      )}
    </div>
  );
}
