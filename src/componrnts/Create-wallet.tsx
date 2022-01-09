import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createMnemonicAndSeed } from "../services/wallets/mnemonic";
import { createWallet } from "../services/wallets/create";
import { walletList } from "../services/wallets/walletList";
import { encryptKey } from "../services/crypto";
import {
   setMnemonic,
   setExistUser,
   setWallets,
   setExpiredTime,
 } from "../services/store/setData";

export default function CreateWallet() {
  const [password, setPassword] = useState("");

  const onChangePassword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmitPassword = async () => {
    const { mnemonic, seed } = await createMnemonicAndSeed();
    const arrayWallets = [];

    for (const coinName of walletList) {
      const wallet = createWallet(seed, coinName);

      if (wallet) {
        const encEey = encryptKey(password, wallet.privateKey);
        arrayWallets.push({ coinName, address: wallet.address, key: encEey });
      } else {
        console.log("Something wrong with create wallet");
      }
    }
    console.log(mnemonic);

     await setWallets(arrayWallets);
     await setMnemonic(mnemonic);
     await setExistUser(true);

     const time = new Date();
     time.setMinutes(time.getMinutes() + 10);
     await setExpiredTime(time.getTime());
  };

  return (
    <form className="min-h-screen sm:w-full p-2 flex flex-col justify-between items-center w-350 h-550">
      <div className="mb-3 w-full flex flex-col items-center">
        <h1 className="font-semibold text-neutral-500 font-bold text-white">
          NoName Waller
        </h1>
        <hr className="text-white w-full opacity-20 mt-2" />
      </div>
      <div className="m-1 sm:w-2/4 w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-2">Create wallet</h1>
        {/*bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600*/}
        {/*bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500*/}
        <input
          value={password}
          onChange={onChangePassword}
          type="password"
          className="outline-none bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm focus:border-gray-700 block w-full p-3 rounded-lg mt-5"
          placeholder="Password"
          autoFocus={true}
          required={true}
        />
      </div>
      <div className="m-1 sm:w-2/4 w-full p-2 bottom-2 right-2">
        <div className="m-1 p-2">
          <button
            className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700"
            type="submit"
            onSubmit={onSubmitPassword}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-10 m-auto"
              fill="none"
              viewBox="0 0 21 21"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
        <div className="m-1 p-2">
          <Link to={"/"}>
            <button className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10 m-auto"
                fill="none"
                viewBox="0 0 21 21"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
