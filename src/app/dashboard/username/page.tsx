"use client";
import Loading from "@/app/component/loading";
// import Gitauth from "@/app/login/server/gitauth";
import React, { useEffect, useState } from "react";
type DataType = {
  id: number;
  name: string;
  username: string;
  email: string;
};
export default function User() {
  const [data, setData] = useState<DataType | null>(null);
  const [user, setUser] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        // setData(json); //returns a json object not string
        setUser(data);
      } catch (err) {
        console.log(err, "there is a error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  // if (isLoading) {
  //   return <div>loading</div>;
  // }

  return (
    <div>
      <div>User</div>
      {/* <Gitauth /> */}
      <div className="flex gap-3 p-3 justify-center">
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        {user.map((u) => (
          <button
            className="border border-blue-400 px-3 py-1 rounded-[10px] cursor-pointer"
            type="submit"
            key={u.id}
            onClick={() => {
              setData(u);
            }}
          >
            user{u.id}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-80 min-h-72 border border-black rounded-2xl p-3">
          <span>id:{data?.id}</span>
          <div>name: {data?.name} </div>
          <div>username: {data?.username}</div>
          <div>email: {data?.email}</div>
          <div>
            <button type="submit">Edit</button>
            <button type="submit" onClick={() => {}}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
