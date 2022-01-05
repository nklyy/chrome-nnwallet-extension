import React, { useState } from "react";

export default function Unlock() {
  const [password, setPassword] = useState("");

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
        <h1 className="text-3xl font-bold text-white mb-2">Unlock wallet</h1>
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
      </div>
    </form>
  );
}
