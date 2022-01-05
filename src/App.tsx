import React from "react";
import Welcome from "./componrnts/Welcome";
import Wallet from "./componrnts/Wallet";
import useExist from "./hooks/existUser";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateWallet from "./componrnts/Create-wallet";
import ImportWallet from "./componrnts/Import-wallet";
import Error from "./componrnts/Error";
import Unlock from "./componrnts/Unlock";
import useExpiredWalletTime from "./hooks/expiredWalletTime";

function App() {
  function PrivateRoute({ children, redirectTo }: any) {
    const { existUser } = useExist();
    return !existUser ? children : <Navigate to={redirectTo} />;
  }

  function PrivateHome({ children }: any) {
    const { existUser } = useExist();
    return existUser ? children : <Navigate to={"/"} />;
  }

  function Lock({ children }: any) {
    const { expired } = useExpiredWalletTime();
    return !expired ? children : <Navigate to={"/unlock"} />;
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
            <Lock>
              <Wallet />
            </Lock>
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

      <Route path={"/unlock"} element={<Unlock />} />

      <Route path={"*"} element={<Error />} />
    </Routes>
  );
}

export default App;
