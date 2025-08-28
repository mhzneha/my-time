"use client";
import React from "react";
import { login } from "../signIn/gitHub";

export default function LoginButton() {
  return (
    <div>
      <form>
        <div className="text-center mt-3">
          <button
            onClick={() => login()}
            className="text-gray-800 font-bold text-[20px]"
          >
            Sign in with git
          </button>
        </div>
      </form>
    </div>
  );
}
