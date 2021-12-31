import React from "react";
import "./App.css";

function App() {
  const onClickSetChrome = async () => {
    const value = 123;
    chrome.storage.local.set({ key: value }, function () {
      console.log("Value is set to " + value);
    });
  };

  const onClickGetChrome = async () => {
    chrome.storage.local.get(["key"], function (result) {
      alert(JSON.stringify(result));
      console.log("Value currently is " + result.key);
    });
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <div>
        <button onClick={onClickSetChrome}>Set</button>
      </div>
      <div>
        <button onClick={onClickGetChrome}>Get</button>
      </div>
    </div>
  );
}

export default App;
