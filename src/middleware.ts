import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.redirect("http://localhost:3000/");
}

export const config = {
    matcher: "/login",
};
