import axios from "axios";
import React from "react";

type TodoDataType = {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
};
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// export const getPost = () => {
//   return api.get("/todos?_limit=4");
// };
export const getPost = () => {
  return Promise.all([
    // api.get("/todos/1"),
    api.get("/todos/4"),
    api.get("/todos/8"),
    // api.get("/todos/2"),
    // api.get("/todos/3"),
  ]).then((responses) => {
    const todos = responses.map((res) => res.data);
    return { data: todos };
  });
};
export const deletePost = (id: number) => {
  return api.delete(`/todos/${id}`);
};
export const postData = (data: { title: string }) => {
  return api.post("/todos", data);
};
export const updatePost = (id: number, data: any) => {
  return api.put(`/todos/${id}`, data);
};
export default function PostApi() {
  return <div>PostApi</div>;
}
