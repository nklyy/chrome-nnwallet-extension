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
