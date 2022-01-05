export interface IEncryptedData {
  data: string;
  iv: string;
  salt: string;
}

export interface ICryptoEnvs {
  Algorithm: string;
  Digest: string;
  KeyLen: number;
  Iteration: number;
}
