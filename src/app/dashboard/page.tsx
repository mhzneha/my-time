"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPost } from "../api/postApi";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthContext } from "../context/authContext";
// import { logOut } from "../login/page";
// import Gitauth from "../login/server/gitauth";

type NewDataType = {
  userId: string;
  id: number;
  title: string;
  body: string;
};
export default function Dashboard() {
  //   const [data, setData] = useState<{ title?: string }>({});
  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/todos/1")
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .then((json) => console.log(json))
  //       .catch((err) => console.log(err, "there is a error"));
  //   }, []),
  const [data, setData] = useState<NewDataType[]>([]);
  const router = useRouter();
  const { user, setUser, logOut } = useAuthContext();
  console.log(getPost());
  async function getPostData() {
    const res = await getPost();
    setData(res?.data);
  }
  const HandlelogOut = async () => {
    try {
      await logOut();
      await cookieStore.delete("userdata");
      // await signOut(auth);
      // console.log("User signed out successfully");
      router.push("/login");
      // setUser(null);
      // user(null);
      // const provider = new GoogleAuthProvider();
      // provider.setCustomParameters({ prompt: "select_account" });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchUserData() {
      await cookieStore.set(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
        })
      );
      const cookie = await cookieStore.get("user");
      if (cookie?.value) {
        const userData = JSON.parse(cookie.value);
        setUser(userData);
      } else {
        router.push("/login");
      }
    }
    fetchUserData();
  }, [router]);

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <div className="h-screen bg-[#F9F6F3]">
      <h2>Dashboard</h2>
      <div>{/* <Gitauth /> */}</div>
      {user && (
        <div className="text-center">
          <p className="text-xl">Welcome, {user.displayName}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      )}
      <div>
        <Link href={"/dashboard/username"}>User Data</Link>
      </div>
      <div>
        <Link href={"/dashboard/movie"}>Movie</Link>
      </div>
      <div>
        <button onClick={HandlelogOut}>Logout</button>
      </div>
      {/* <div>
        {data.map((u) => (
          <div key={u.id}>{u?.id}</div>
        ))}
      </div> */}
      {/* <div>
        <User />
      </div>
      <div>
        <Movie />
      </div> */}
    </div>
  );
}
