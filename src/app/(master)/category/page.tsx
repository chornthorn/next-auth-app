"use client";

import { usePermission } from "@/libs/hooks/use-permission";

const Page = async () => {
  // call api

  const categoryPermission = usePermission({
    resource: "category",
    scope: ["read", "write", "update"],
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Category</h1>
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="flex flex-row justify-center items-center">
          <span className="text-xl font-bold">Read:</span>
          <span className="text-xl font-bold ml-2">
            {categoryPermission.read ? "Allowed" : "Denied"}
          </span>
        </div>
        <div className="flex flex-row justify-center items-center">
          <span className="text-xl font-bold">Write:</span>
          <span className="text-xl font-bold ml-2">
            {categoryPermission.write ? "Allowed" : "Denied"}
          </span>
        </div>
        <div className="flex flex-row justify-center items-center">
          <span className="text-xl font-bold">Update:</span>
          <span className="text-xl font-bold ml-2">
            {categoryPermission.update ? "Allowed" : "Denied"}
          </span>
        </div>
        <div className="flex flex-row justify-center items-center">
          <span className="text-xl font-bold">Delete:</span>
          <span className="text-xl font-bold ml-2">
            {categoryPermission.delete ? "Allowed" : "Denied"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
