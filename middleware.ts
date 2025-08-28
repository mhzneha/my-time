// import { auth as middleware } from "./auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import React from "react";

export default function middleware(req: NextRequest) {
  console.log("md ran ");
  return NextResponse.next;
}
