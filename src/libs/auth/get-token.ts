import { auth } from "./auth";
import { decrypt } from ".././encryption";

const getAccessToken = async () => {
  const authn: any = await auth();
  const token = decrypt(authn.access_token);
  if (token) {
    return token;
  }
  return null;
};

const getIdToken = async () => {
  const authn: any = await auth();
  const token = decrypt(authn.id_token);
  if (token) {
    return token;
  }
  return null;
};

export { getAccessToken, getIdToken };
