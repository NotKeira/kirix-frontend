import { serialize, parse } from "cookie";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export type CookieOptions = {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    path: string;
    maxAge?: number;
}

export const TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.MODE === "production",
  sameSite: "strict" as const,
  path: "/",
};

export const setCookie = (
    res: any,
    name: string,
    value: string,
    options: Partial<typeof TOKEN_COOKIE_OPTIONS> = {}
) => {
    const cookie = serialize(name, value, { ...TOKEN_COOKIE_OPTIONS, ...options});
    res.setHeader("Set-Cookie", cookie);
};

export const getCookies = (req: any) => {
    const cookieHeader = req.headers?.cookie || '';
    return parse(cookieHeader);
}

export const clearCookie = (res: any, name: string) => {
    setCookie(res, name, '', { maxAge: -1});
}
