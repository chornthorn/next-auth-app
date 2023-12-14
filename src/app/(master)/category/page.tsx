"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

async function getCategory() {
  // get category
  const response = await fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: any = await response.json();
  return data.data;
}

const Page = () => {
  const [category, setCategory] = useState([]);

  const segment = useSelectedLayoutSegment();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    getCategory().then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <div>
      <h1>Category</h1>
      <hr />
      {category.map((item: any) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
      <hr />
      <h2>Segment</h2>
      <p>Active segment: {segment}</p>
      <h2>Search</h2>
      <p>Search: {search}</p>
    </div>
  );
};

export default Page;
