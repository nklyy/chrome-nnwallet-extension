import crypto from "crypto";
import { IEncryptedData } from "./interfaces";
import { getCryptEnv } from "./helpers";

export function decryptKey(encryptedData: IEncryptedData, password: string) {
  try {
    const { Algorithm, Iteration, KeyLen, Digest }: any = getCryptEnv();

    const Key = crypto.pbkdf2Sync(
      password,
      Buffer.from(encryptedData.salt, "hex"),
      Iteration,
      KeyLen,
      Digest
    );

    const decipher = crypto.createDecipheriv(
      Algorithm,
      Key,
      Buffer.from(encryptedData.iv, "hex")
    );
    return Buffer.concat([
      decipher.update(Buffer.from(encryptedData.data, "hex")),
      decipher.final(),
    ]);
  } catch (e: any) {
    return new Error(e.message);
  }
}

// Decrypts cipher text into plain text
export function decryptTest(cipherText: any) {
  const ALGORITHM = "aes-256-cbc";
  const CIPHER_KEY = "abcdefghijklmnopqrstuvwxyz012345"; // Same key used in Golang
  const BLOCK_SIZE = 16;

  const contents = Buffer.from(cipherText, "hex");
  const iv = contents.slice(0, BLOCK_SIZE);
  const textBytes = contents.slice(BLOCK_SIZE);

  const decipher: any = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, iv);
  let decrypted = decipher.update(textBytes, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
