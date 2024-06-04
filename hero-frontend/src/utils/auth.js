import CryptoJS from "crypto-js";

export const generateHash = (ts, privateKey, publicKey) => {
  const toHash = `${ts}${privateKey}${publicKey}`;
  return CryptoJS.MD5(toHash).toString();
};
