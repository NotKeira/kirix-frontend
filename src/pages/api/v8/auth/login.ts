import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
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
    return res.status(500).json({ name: "Internal Server Error" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const body = req.body as Payload | undefined;
  if (!body) {
    return res.status(400).json({ name: "Bad Request" });
  }

  const response = await fetch(
    `${
      process.env.MODE == "development"
        ? "http://localhost:3000"
        : "https://api.kirix.app"
    }/api/auth/v1/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
}
