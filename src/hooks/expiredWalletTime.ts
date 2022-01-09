import { useEffect, useState } from "react";

export default function useExpiredWalletTime() {
  const [expired, setExpired] = useState(true);

  useEffect(() => {
    chrome.storage.managed.get({ expire: Date.now() }, function (data) {
      setExpired(data.expire > Date.now());
    });
  }, []);

  return { expired };
}
