import { auth } from "@/libs/auth";

const Page = async () => {
  const token = await auth();

  return (
    <div>
      <div>
        <h1>Me</h1>
        <code>
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
};

export default Page;
