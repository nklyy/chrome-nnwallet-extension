import { useEffect, useState } from "react";

export default function useExpiredWalletTime() {
  const [expired, setExpired] = useState(true);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get({ expire: Date.now() }, function (data) {
        setExpired(data.expire > Date.now());
      });
    }

    if (localStorage) {
      const expire = localStorage.getItem("expire");
      if (expire) {
        setExpired(parseInt(expire) > Date.now());
      }
    }

   }, []);

  return { expired };
}
