"use client";

import React, { useState } from "react";
import PositionButton from "@/app/(master)/positions/position-button";
import { submitPosition } from "@/actions/position-action";

const PositionForm = () => {
  const [data, setData] = useState({
    id: 0,
    name: "",
    description: "",
  });

  // clear form
  const clearForm = () => {
    setData({
      id: 0,
      name: "",
      description: "",
    });
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form
      action={(formData: FormData) => {
        submitPosition(formData).then(() => {
          clearForm();
        });
      }}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <PositionButton />
    </form>
  );
};

export default PositionForm;
