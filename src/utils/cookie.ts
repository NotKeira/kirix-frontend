import { serialize, parse } from "cookie";
export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  path: string;
  maxAge?: number;
};

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
  console.log("Setting cookie", name, value, options);
  const cookie = serialize(name, value, {
    ...TOKEN_COOKIE_OPTIONS,
    ...options,
  });
  const existingCookies = res.getHeader("Set-Cookie") || [];

  // Ensure cookies are stored as an array
  const updatedCookies = Array.isArray(existingCookies)
    ? [...existingCookies, cookie]
    : [existingCookies, cookie];

  res.setHeader("Set-Cookie", updatedCookies);
};

export const getCookies = (req: any) => {
  const cookieHeader = req.headers?.cookie || "";
  return parse(cookieHeader);
};

export const clearCookie = (res: any, name: string) => {
  setCookie(res, name, "", { maxAge: -1 });
};
