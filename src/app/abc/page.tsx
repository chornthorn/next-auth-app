import { auth } from "@/libs/auth";
import HttpClient from "@/libs/http-client";

export default async function Page() {
  const session = await auth();

  const response: any = await HttpClient({
    baseUrl: "http://localhost:3001/api/v1.0",
  })
    .get("/categories")
    .catch((error) => {});

  const category = await response?.data;

  console.log("category in page", category);

  return (
    <div>
      <h1>Page</h1>
      <p>ABC page. This page is only accessible to authenticated users</p>
      <code
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>

      {/*    category */}
      <p>{JSON.stringify(category)}</p>
    </div>
  );
}
