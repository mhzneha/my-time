"use server";
import React from "react";
import { auth } from "../../../auth";
import LoginButton from "@/app/component/button/LoginButton";
import LogoutButton from "@/app/component/button/LogoutButton";

export default async function Gitauth() {
  const session = await auth();
  //   console.log(session);
  if (session?.user) {
    return (
      <div>
        <h2>Signed In</h2>
        <div>Name: {session.user?.name}</div>
        <div>Email:{session.user?.email}</div>
        {/* <button onClick={() => logout}>Logout</button> */}
        <LogoutButton />
      </div>
    );
  }
  return (
    <div>
      <p>You are not signed</p>
      <LoginButton />
    </div>
  );
}
