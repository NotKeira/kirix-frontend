import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "@/utils/cookie";

type Data = {
  code: string;
  message: string;
  data:
    | {
        user: {
          id: string;
          username: string;
        };
      }
    | null
    | undefined;
};

type Payload = {
  email: string | undefined | null;
  password: string ;
  username: string | undefined | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ code: "success", message: "Internal Server Error", data: null });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const body = req.body as Payload | undefined;
  if (!body) {
    return res
      .status(400)
      .json({ code: "failure", message: "Bad Request", data: null });
  }

  const response = await fetch(
    `${
      process.env.MODE == "development"
        ? "http://localhost:3000"
        : "https://api.kirix.app"
    }/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        username: body.username || "",
        email: body.email || "",
        password: body.password,
      }),
    }
  );

  if (response.status !== 200) {
    const data = await response.json();
    res.status(400).json(data);
  } else {
    const data = await response.json();
    if (data.code === "success") {
      console.log("Login successful");
      console.log(data.data.user.tokens.accessToken);
      console.log(data.data.user.tokens.refreshToken);
      setCookie(res, "accessToken", data.data.user.tokens.accessToken, {
        maxAge: 15 * 60,
      });
      setCookie(res, "refreshToken", data.data.user.tokens.refreshToken, {
        maxAge: 7 * 24 * 60 * 60,
      });
    }
    return res.status(200).json(data as Data);
  }
}
