// "use client";
import Image from "next/image";
import Login from "./login/page";
import Gitauth from "./server/gitauth";
import { AuthProvider } from "./context/authContext";

export default function Home() {
  return (
    <>
      {/* <Gitauth /> */}
      <AuthProvider>
        <Login />
      </AuthProvider>
    </>
  );
}
