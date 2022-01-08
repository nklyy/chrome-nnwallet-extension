import * as bip32 from "bip32";
// import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { bech32 } from "bech32";

import { ATOMCosmosPath, BTCPath } from "./paths";
import { IWalletData } from "./interfaces";

export const createWallet = (seed: Buffer, coinName: string) => {
  switch (coinName) {
    case "BTC":
      // const network = bitcoin.networks.bitcoin; //use networks.testnet for testnet

      let BTCNode = bip32.fromSeed(seed);

      let account = BTCNode.derivePath(BTCPath);
      // let BTCChild = account.derive(0).derive(0);

      //p2pkh
      const BTCAddress = bitcoin.payments.p2wpkh({
        pubkey: account.publicKey,
      }).address;

      const BTCPrivateKey = account.toWIF();

      return {
        address: BTCAddress,
        privateKey: BTCPrivateKey,
      } as IWalletData;
    case "ATOM-Cosmos":
      const prefix = "cosmos";

      const ATOMNode = bip32.fromSeed(seed);
      const ATOMChild = ATOMNode.derivePath(ATOMCosmosPath);
      const ATOMWords = bech32.toWords(ATOMChild.identifier);
      const ATOMAddress = bech32.encode(prefix, ATOMWords);
      const ATOMPrivateKey = ATOMChild.privateKey
        ? ATOMChild.privateKey.toString("base64")
        : new Error("private key is undefined");

      return {
        address: ATOMAddress,
        privateKey: ATOMPrivateKey,
      } as IWalletData;
  }
};
