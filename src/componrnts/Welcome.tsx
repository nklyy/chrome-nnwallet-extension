import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen sm:w-full p-2 flex flex-col justify-center items-center w-350 h-550">
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
