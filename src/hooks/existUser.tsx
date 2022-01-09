import { useEffect, useState } from "react";

export default function useExistUser() {
  const [existUser, setExistUser] = useState(false);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.managed.get({ exist: false }, function (data) {
        setExistUser(!(typeof data.exist === "undefined" || !data.exist));
      });
    }

    if (localStorage) {
      const exist = localStorage.getItem("exist");
      setExistUser(!(typeof exist === "undefined" || !exist));
    }
  }, []);


  console.log("existUser:", existUser);

  return { existUser };
}
