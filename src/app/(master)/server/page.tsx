import { syncUser } from "@/libs/services/auth-service";

const Page = async () => {
  const user = await syncUser();

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
