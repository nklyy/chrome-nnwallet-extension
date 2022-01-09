export const setWallets = async (wallets: any) => {
  //await chrome.storage.local.set({ wallets: wallets });
  await setDataToStore({ wallets: wallets });
};

export const setMnemonic = async (mnemonic: string) => {
  //await chrome.storage.local.set({ mnemonic: mnemonic });
  await setDataToStore({ mnemonic: mnemonic });
};

export const setExistUser = async (exist: boolean) => {
  //await chrome.storage.local.set({ exist: exist });
  await setDataToStore({ exist: exist });
};

export const setExpiredTime = async (time: any) => {
  //await chrome.storage.local.set({ expire: time });
  await setDataToStore({ expire: time });
};

const setDataToStore = async (data: any) => {
  if (chrome.storage) {
    await chrome.storage.local.set(data);
  }

  if (localStorage) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    localStorage.setItem(keys[0], <string>values[0]);
  }
}
