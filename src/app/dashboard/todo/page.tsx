"use client";
import { deletePost, getPost } from "@/app/api/postApi";
import ToDoListCard from "@/app/card/toDoListCard";
import DateTime from "@/app/component/date";
import TodoForm from "@/app/component/todoForm";
import React, { useEffect, useState } from "react";
type TodoDataType = {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
};
export default function Todo() {
  const [data, setData] = useState<TodoDataType[]>([]);
  const [updateData, setUpdateData] = useState({});
  async function getPostData() {
    try {
      const res = await getPost();
      //   console.log(res);

      setData(res?.data);
    } catch (error) {
      console.log(error, "there is a error");
    }
  }
  useEffect(() => {
    getPostData();
  }, []);
  async function onDelete(id: number) {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newData = data.filter((item) => {
          return item.id !== id;
        });
        setData(newData);
      }
    } catch (error) {
      console.log(error, "there is an error");
    }
  }
  async function onEdit(item: TodoDataType) {
    setUpdateData(item);
  }
  return (
    <div className="h-full bg-[#F9F6F3]">
      <div className="">
        <DateTime />
      </div>
      <div className="p-3 flex items-center flex-col">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Task To Do
        </h2>

        <div>
          <TodoForm
            data={data}
            setData={setData}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        </div>
        <div className="">
          {data.map((item) => {
            return (
              <ToDoListCard
                key={item.id}
                todoType={item}
                handleDelete={onDelete}
                handleEdit={onEdit}
              ></ToDoListCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
