import React, { useState } from "react";
import { deletePost } from "../api/postApi";
type TodoDataType = {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
};
type Props = {
  todoType: TodoDataType;
  handleDelete: (id: number) => {};
  handleEdit: (item: TodoDataType) => void;
};
export default function ToDoListCard({
  todoType,
  handleDelete,
  handleEdit,
}: Props) {
  const { userId, id, title, completed } = todoType;
  // const [data, setData] = useState<TodoDataType[]>([]);

  return (
    <div className="w-full">
      <li className="list-none mt-10">
        <div className="shadow-[0px_2px_10px_rgba(0,0,0,0.3)] min-h-[150px] flex justify-between p-6 gap-6 rounded-3xl bg-white">
          <div className="">
            <span className="">{id}</span>
            <div>
              {/* <span>User: {userId}</span> */}
              <div>Title: {title}</div>
            </div>
            <div>completed: {completed ? "Done" : "pending"}</div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex gap-6 text-white font-bold">
              <button
                type="submit"
                className="min-w-20 h-fit px-5 py-2 rounded-2xl bg-[#61C0BF] "
                onClick={() => {
                  handleEdit(todoType);
                }}
              >
                Edit
              </button>
              <button
                type="submit"
                className=" min-w-20  h-fit px-5 py-2 rounded-2xl bg-[#FFB6B9]"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                Delete
              </button>
            </div>
            <div className="mt-5 text-end">Mark as Done</div>
          </div>
        </div>
      </li>
    </div>
  );
}
