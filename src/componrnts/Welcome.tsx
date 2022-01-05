import React, { useState } from "react";
import { Link } from "react-router-dom";
import { decryptTest, encryptTest } from "../services/crypto";

export default function Welcome() {
  const [password, setPassword] = useState("");

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickSendButton = () => {
    const encText = encryptTest(password);
    console.log(encText);

    const decText = decryptTest(encText);
    console.log(decText);
  };

  return (
    <div className="min-h-screen sm:w-full p-2 flex flex-col justify-center items-center w-350 h-550">
      {/*-----------------------------------------------------*/}
      <input onChange={onChangePassword} value={password} type="text" />
      <button onClick={onClickSendButton} className="bg-neutral-300 m-2 p-2">
        send encrypt data
      </button>
      {/*-----------------------------------------------------*/}

      <div className="mb-2">
        <h1 className="text-3xl font-bold text-white">Welcome</h1>
      </div>
      <div className="m-1 sm:w-2/4 w-full p-2">
        {/*bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600*/}
        {/*bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500*/}
        <Link to={"/import-wallet"}>
          <button className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
            Import account
          </button>
        </Link>
      </div>
      <div className="m-1 sm:w-2/4 w-full p-2">
        <Link to={"/create-wallet"}>
          <button className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
            Create account
          </button>
        </Link>
      </div>
    </div>
  );
}
