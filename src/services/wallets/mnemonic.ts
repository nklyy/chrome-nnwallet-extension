import * as bip39 from "bip39";
import { IMnemonicAndSeedData } from "./interfaces";

export async function createMnemonicAndSeed(): Promise<IMnemonicAndSeedData> {
  const mnemonic: string = bip39.generateMnemonic();
  const seed: Buffer = await bip39.mnemonicToSeed(mnemonic);

  return {
    mnemonic,
    seed,
  } as IMnemonicAndSeedData;
}
