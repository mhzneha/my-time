"use client";
import React from "react";
import { logout } from "../signIn/gitHub";

export default function LogoutButton() {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
