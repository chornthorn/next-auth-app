import Cryptr from "cryptr";

const encrypt = (text: string) => {
  const secretKey = process.env.NEXTAUTH_SECRET || "secret";
  const cryptr = new Cryptr(secretKey);
  return cryptr.encrypt(text);
};

const decrypt = (text: string) => {
  const secretKey = process.env.NEXTAUTH_SECRET || "secret";
  const cryptr = new Cryptr(secretKey);
  return cryptr.decrypt(text);
};

export { encrypt, decrypt };
