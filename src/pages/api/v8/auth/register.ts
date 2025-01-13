import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  code: string;
  message: string;
  data:
    | {
        user: {
          id: string;
          username: string;
          tokens: {
            accessToken: string;
            refreshToken: string;
          };
        };
      }
    | null
    | undefined;
};

type Payload = {
  email: string;
  password: string;
  username: string;
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

  // Continue with the request
  const response = await fetch(
    `${
      process.env.MODE == "development"
        ? "http://localhost:3000"
        : "https://api.kirix.app"
    }/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        username: body.username,
        email: body.email,
        password: body.password,
      }),
    }
  );

  if (response.status !== 200) {
    res
      .status(500)
      .json({ code: "failure", message: "Internal Server Error", data: null });
  } else {
    const data = await response.json();
    return res.status(200).json(data as Data);
  }
}
