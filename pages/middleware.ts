import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const redirect = (path: string, req: NextRequest) => NextResponse.redirect(new URL(path, req.url));

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.TOKEN
  });
  if (!token) return redirect('/', req);

  return NextResponse.next();
}