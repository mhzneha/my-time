import Link from "next/link";
import React, { ReactNode } from "react";

export default function Nav() {
  return (
    <div>
      <div className="flex justify-between p-6 items-center">
        <Link href={"/dashboard"} className="text-4xl font-bold text-teal-600">
          TM
        </Link>
        <div className="flex gap-12 text-[20px] font-bold text-cyan-950">
          <Link href={"/dashboard/todo"}>ToDo Task</Link>
          <Link href={"/dashboard/movie"}>Movies</Link>
          <Link href={"/dashboard/username"}>Users</Link>
        </div>
      </div>
    </div>
  );
}
