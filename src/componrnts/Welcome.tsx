import React from "react";

export default function Welcome() {
  return (
    <div className="min-h-screen w-full p-2 flex flex-col justify-center items-center">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-white">Welcome</h1>
      </div>
      <div className="m-1">
        {/*bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600*/}
        {/*bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500*/}
        <button className="font-bold w-36 px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
          Import account
        </button>
      </div>
      <div className="m-1">
        <button className="font-bold w-36 px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
          Create account
        </button>
      </div>
    </div>
  );
}
