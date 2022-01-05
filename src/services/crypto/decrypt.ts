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
