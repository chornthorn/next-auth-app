"use client";

import { useEffect, useState } from "react";

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
    </div>
  );
};

export default Page;
