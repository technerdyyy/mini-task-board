"use client";
import axios from "axios";
import { useState,useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  created_at: string;
  status: string;
};

export default function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const handleTabs = (tab: number) => {
    setTab(tab);
    // console.log(tab);
  }

  const handleAddTask = (e)=> {
    e.preventDefault();
    axios.post('http://localhost:5000/new-task', { task }).then(res => {
      // console.log(res.data);
      setTask("");
      setTodos(Array.isArray(res.data) ? res.data : []);

    }).catch((err) => {
      console.error("failed to add task:", err);
    })
    // console.log(task);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/read-tasks').then((res) => {
      // console.log(res.data);
      setTodos(Array.isArray(res.data) ? res.data : []);
    }).catch((err) => {
      console.error("failed to load tasks:", err);
    })

  },[])

  const handleEdit = (id: number, title: string) => {
    setIsEdit(true);
    setTask(title);
    setUpdateId(id);
  }
  const handleUpdateTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/update-task', { updateId, updatedTask: task }).then(res => {
      setTodos(Array.isArray(res.data) ? res.data : []);
      setTask("");
      setIsEdit(false);
      setUpdateId(null);
    }).catch((err) => {
      console.error("failed to update task:", err);
    });
  }
  return <div className=" w-screen h-screen">
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div>
      <h2 className="font-bold text-2xl">Mini Task Board</h2>
    </div>
    <div className="flex flex-row gap-2 mt-4">
      <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder="Add a new task..." className=" w-60 p-2 outline-none border border-gray-100 rounded-md"/>
    <button className="cursor-pointer" onClick={isEdit ? handleUpdateTask : handleAddTask}>{isEdit ? "Update Task" : "Add Task"}</button>
    </div>
    <div className="flex text-md w-80 justify-evenly mt-4 cursor-pointer">
      <p onClick={() => handleTabs(1)} className={`${tab === 1 ? "text-white" : "text-gray-500"} cursor-pointer`}>Todos</p>
      <p onClick={() => handleTabs(2)} className={`${tab === 2 ? "text-white" : "text-gray-500"} cursor-pointer`}>In Progress</p>
      <p onClick={() => handleTabs(3)} className={`${tab === 3 ? "text-white" : "text-gray-500"} cursor-pointer`}>Done</p>
    </div>
    {todos.map(todo =>(
<div key={todo.id} className="flex justify-between flex-row gap-4 mt-4 border border-gray-100 p-3 rounded-md w-80">
    <div>
      <p className="text-lg font-semibold">{todo.title}</p>
      <p className="text-sm text-gray-500">{new Date(todo.created_at).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Status: {todo.status}</p>
    </div>
    <div className="flex flex-col gap-2 justify-start items-start ">
      <button  onClick={() => handleEdit(todo.id, todo.title)} className="text-yellow-500 cursor-pointer">Edit</button>
      <button className="text-red-500 cursor-pointer">Delete</button>
      <button className="text-green-500 cursor-pointer">Done</button>
    </div>
    </div>
    ))}
   
    </div>
  </div>;
}
