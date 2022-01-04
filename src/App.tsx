import React from "react";
import Welcome from "./componrnts/Welcome";
import Wallet from "./componrnts/Wallet";
import useExist from "./hooks/existUser";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateWallet from "./componrnts/Create-wallet";
import ImportWallet from "./componrnts/Import-wallet";
import Error from "./componrnts/Error";

function App() {
  function PrivateRoute({ children, redirectTo }: any) {
    const { existUser } = useExist();
    return !existUser ? children : <Navigate to={redirectTo} />;
  }

  function PrivateHome({ children }: any) {
    const { existUser } = useExist();
    return existUser ? children : <Navigate to={"/"} />;
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute redirectTo={"/home"}>
            <Welcome />
          </PrivateRoute>
        }
      />

      <Route
        path={"/home"}
        element={
          <PrivateHome>
            <Wallet />
          </PrivateHome>
        }
      />

      <Route
        path={"/create-wallet"}
        element={
          <PrivateRoute redirectTo={"/home"}>
            <CreateWallet />
          </PrivateRoute>
        }
      />

      <Route
        path={"/import-wallet"}
        element={
          <PrivateRoute redirectTo={"/home"}>
            <ImportWallet />
          </PrivateRoute>
        }
      />

      <Route path={"*"} element={<Error />} />
    </Routes>
  );
}

export default App;
