import React, { ChangeEvent, useEffect, useState } from "react";
import InputText from "./input/inputText";
import { postData, updatePost } from "../api/postApi";

export default function TodoForm({ data, setData, updateData, setUpdateData }) {
  const [task, setTask] = useState({
    title: "",
  });

  function handleInputTask(e: ChangeEvent<HTMLInputElement>) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }
  async function addTask() {
    try {
      const res = await postData(task);
      console.log("res", res);

      if (res.status === 201) {
        setData([...data, res.data]);

        setTask({ title: "" });
      }
    } catch (error) {
      console.log(error, "there is a error");
    }
  }
  function handleTaskAdd(e) {
    e.preventDefault();
    if (updateData?.id) {
      updateTask();
    } else {
      addTask();
    }
  }

  useEffect(() => {
    if (updateData?.id) {
      setTask({ title: updateData.title });
    }
  }, [updateData]);

  async function updateTask() {
    try {
      const res = await updatePost(updateData.id, task);
      if (res.status === 200) {
        const updatedList = data.map((item: any) =>
          item.id === updateData.id ? { ...item, ...res.data } : item
        );
        setData(updatedList);
        setTask({ title: "" });
        setUpdateData({});
      }
    } catch (error) {
      console.log(error, "there is an error");
    }
  }
  return (
    <form
      className="flex gap-8 items-center mt-5 mb-8"
      onSubmit={handleTaskAdd}
    >
      <h4 className="text-[20px] font-bold text-center text-gray-700">
        {updateData?.id ? "Update Task" : "Add Task"}
      </h4>
      <div className="flex gap-4 items-center">
        <InputText
          type="text"
          name="title"
          value={task.title}
          id=""
          placeholder="Enter your task"
          onchangeInput={handleInputTask}
        />
        {/* <textarea
          className="border border-blue-400 px-3 py-1 rounded-[8px] text-[18px] w-80 bg-white"
          name="title"
          value={task.title}
          id="title"
          placeholder="Enter your task"
          typeof="text"
          onChange={handleInputTask}
        ></textarea> */}
        <button
          //   type="submit"
          className="bg-[#BBDED6] text-[20px] px-5 py-1 rounded-[8px] cursor-pointer w-fit  text-gray-700 font-bold"
          onClick={handleTaskAdd}
        >
          {updateData?.id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
