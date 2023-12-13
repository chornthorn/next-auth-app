import { auth } from "@/libs/auth";

const Page = async () => {
  const authn = await auth();

  return (
    <div>
      <h1>My Client</h1>
      <br />
      <code>
        <pre>{JSON.stringify(authn, null, 2)}</pre>
      </code>
    </div>
  );
};

export default Page;
