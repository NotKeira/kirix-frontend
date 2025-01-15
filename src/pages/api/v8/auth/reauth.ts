import { NextApiRequest, NextApiResponse } from "next";
import { getCookies, setCookie, clearCookie } from "@/utils/cookie";

export default async function checkAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = getCookies(document);
  if (!cookies.token) {
    return;
  }

  const response = await fetch("/api/v8/auth/reauth", {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    return;
  }
  console.log(data);
}
