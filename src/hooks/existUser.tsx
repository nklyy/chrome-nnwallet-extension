import { useEffect, useState } from "react";

export default function useExistUser() {
  const [existUser, setExistUser] = useState(false);

  // useEffect(() => {
  //   chrome.storage.local.get({ exist: false }, function (data) {
  //     setExistUser(!(typeof data.exist === "undefined" || !data.exist));
  //   });
  // }, []);

  return { existUser };
}
