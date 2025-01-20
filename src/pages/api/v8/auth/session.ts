import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie, getCookies, clearCookie } from "@/utils/cookie";

export type SessionData = {
  username: string;
  id: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
        const sessionData = await getCookies(req);
        console.log(sessionData);
        return res.status(200).json({ code: "success", data: sessionData });
    case "POST":
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
