"use server";

import { revalidatePath } from "next/cache";
import { httpClient } from "@/libs/axios";

function generatePositionCode() {
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const paddedNumber = String(randomNumber).padStart(4, "0"); // Pad the number with zeros to ensure it has 4 digits
  return `POS-${paddedNumber}`;
}

const submitPosition = async (formData: FormData) => {
  const code = generatePositionCode();
  const name = formData.get("name");
  const desc = formData.get("description");

  await httpClient.post("/positions", {
    code,
    name,
    description: desc,
  });

  revalidatePath("/positions");
};

export { submitPosition };
