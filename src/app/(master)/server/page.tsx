import { auth } from "@/libs/auth";

const Page = async () => {
  const authn: any = await auth();
  const user = authn?.user_info;
  return (
    <div>
      <h1>My Server</h1>
      <code>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </code>
    </div>
  );
};

export default Page;
