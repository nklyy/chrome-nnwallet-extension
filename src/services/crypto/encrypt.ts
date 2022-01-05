import crypto from "crypto";
import { IEncryptedData } from "./interfaces";
import { getCryptEnv } from "./helpers";

export function encryptKey(password: string, text: string) {
  try {
    const { Algorithm, Iteration, KeyLen, Digest }: any = getCryptEnv();

    const salt = crypto.randomBytes(32);

    const KEY = crypto.pbkdf2Sync(password, salt, Iteration, KeyLen, Digest);

    const IV = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(Algorithm, KEY, IV);

    const data = {
      encrypted: Buffer.concat([cipher.update(text), cipher.final()]),
    };

    return {
      data: data.encrypted.toString("hex"),
      salt: salt.toString("hex"),
      iv: IV.toString("hex"),
      key: KEY.toString("hex"),
    } as IEncryptedData;
  } catch (e: any) {
    return new Error(e.message);
  }
}

// Encrypts plain text into cipher text
export function encryptTest(plainText: string) {
  const ALGORITHM = "aes-256-cbc";
  const CIPHER_KEY = "abcdefghijklmnopqrstuvwxyz012345"; // Same key used in Golang
  const BLOCK_SIZE = 16;

  const iv = crypto.randomBytes(BLOCK_SIZE);
  const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, iv);
  let cipherText;
  try {
    cipherText = cipher.update(plainText, "utf8", "hex");
    cipherText += cipher.final("hex");
    cipherText = iv.toString("hex") + cipherText;
  } catch (e) {
    cipherText = null;
  }
  return cipherText;
}
