"use client";
import axios from "axios";
import { useState,useEffect } from "react";

export default function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState(null);
  const [todos, setTodos] = useState(null);
  const handleTabs = (tab: number) => {
    setTab(tab);
    // console.log(tab);
  }

  const handleAddTask = (e)=> {
    e.preventDefault();
    axios.post('http://localhost:5000/new-task', { task })
    // console.log(task);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/read-tasks').then((res) => {
      // console.log(res.data);
      setTodos(res.data);
    })

  },[])
  return <div className=" w-screen h-screen">
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div>
      <h2 className="font-bold text-2xl">Mini Task Board</h2>
    </div>
    <div className="flex flex-row gap-2 mt-4">
      <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="Add a new task..." className=" w-60 p-2 outline-none border border-gray-100 rounded-md"/>
    <button onClick={handleAddTask} className="cursor-pointer" >Add Task  </button>
    </div>
    <div className="flex text-md w-80 justify-evenly mt-4 cursor-pointer">
      <p onClick={() => handleTabs(1)} className={`${tab === 1 ? "text-white" : "text-gray-500"} cursor-pointer`}>Todos</p>
      <p onClick={() => handleTabs(2)} className={`${tab === 2 ? "text-white" : "text-gray-500"} cursor-pointer`}>In Progress</p>
      <p onClick={() => handleTabs(3)} className={`${tab === 3 ? "text-white" : "text-gray-500"} cursor-pointer`}>Done</p>
    </div>
    {todos?.map(todo =>(
<div className="flex justify-between flex-row gap-4 mt-4 border border-gray-100 p-3 rounded-md w-80">
    <div>
      <p className="text-lg font-semibold">{todo.title}</p>
      <p className="text-sm text-gray-500">{new Date(todo.created_at).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Status: {todo.status}</p>
    </div>
    <div className="flex flex-col gap-2 justify-start items-start ">
      <button className="text-yellow-500 cursor-pointer">Edit</button>
      <button className="text-red-500 cursor-pointer">Delete</button>
      <button className="text-green-500 cursor-pointer">Done</button>
    </div>
    </div>
    ))}
   
    </div>
  </div>;
}
