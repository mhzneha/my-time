"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import InputLabel from "../component/input/inputLabel";
import InputText from "../component/input/inputText";
import { useRouter } from "next/navigation";
import { signIn } from "../../../auth";
import { login } from "../component/signIn/gitHub";
import LoginButton from "../component/button/LoginButton";
import Link from "next/link";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuthContext } from "../context/authContext";
import { getDisplayName } from "next/dist/shared/lib/utils";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  // const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const { user, setUser } = useAuthContext();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "userName") {
      setUserName(e.target.value);
    } else if (e.target.name == "password") {
      if (e.target.value.length <= 8) {
        setErrorPassword("There must be 8 characters");
      } else {
        setErrorPassword("");
      }
      setPassword(e.target.value);
    }
    console.log(e.target.name, e.target.value);
  };

  const onSubmit = () => {
    if (!userName) {
      usernameRef.current?.focus();
      setErrorUser("Username is required");
    } else if (!password) {
      passwordRef.current?.focus();
      setErrorPassword("Password is required");
    } else {
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      provider.setCustomParameters({ prompt: "select_account" });
      const user = result.user;
      await cookieStore.set(
        "user",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        })
      );
      console.log("Google Sign-In successful:", user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <div className="h-screen min-w-2xs flex flex-col items-center justify-center ">
        <div className="bg-blue-200 p-5 rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Login
          </h2>
          <div className=" flex flex-col items-center mt-5">
            <div>
              <div className=" flex flex-col ">
                <div className="flex gap-4 p-3 items-center">
                  <InputLabel label="UserName"></InputLabel>
                  <InputText
                    type="text"
                    ref={usernameRef}
                    name="userName"
                    value={userName}
                    id={""}
                    placeholder="eg:mhz-neha"
                    onchangeInput={onChangeEvent}
                  ></InputText>
                </div>
                <div className="pl-5 text-red-500">{errorUser}</div>
                <div className="flex gap-4 p-3 items-center">
                  <InputLabel label="Password"></InputLabel>
                  <InputText
                    type="password"
                    name="password"
                    value={password}
                    id={""}
                    placeholder="*****"
                    onchangeInput={onChangeEvent}
                  ></InputText>
                </div>
                <div className="pl-5 text-red-500">{errorPassword}</div>
              </div>
              <div className="tetx-start pl-5 pt-3 pb-5 text-[18px]">
                Don't have an account?
                <Link href={"/register"} className="pl-2 text-red-500">
                  Register
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-400 text-2xl px-5 py-2 rounded-2xl cursor-pointer mt-3  text-gray-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !userName || !password || !!errorUser || !!errorPassword
                }
                onClick={onSubmit}
              >
                Login
              </button>
              <LoginButton />
              <button
                type="button"
                onClick={googleSignIn}
                className=" text-gray-800 text-[20px] font-bold cursor-pointer"
              >
                Sign in with Google
              </button>

              {/* {user && (
                <button
                  type="button"
                  onClick={logOut}
                  className="bg-gray-500 text-white px-5 py-2 rounded-2xl hover:bg-gray-600"
                >
                  Sign Out
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
