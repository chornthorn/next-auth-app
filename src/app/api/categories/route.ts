import { httpClient } from "@/libs/axios";

export async function GET(req: Request) {
  const response = await httpClient.get("/categories");

  const bodyResponse = await response.data;
  const { data } = bodyResponse;
  return Response.json({ data });
}
