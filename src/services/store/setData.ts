export const setWallets = async (wallets: any) => {
  await chrome.storage.local.set({ wallets: wallets });
};

export const setMnemonic = async (mnemonic: string) => {
  await chrome.storage.local.set({ mnemonic: mnemonic });
};

export const setExistUser = async (exist: boolean) => {
  await chrome.storage.local.set({ exist: exist });
};

export const setExpiredTime = async (time: any) => {
  await chrome.storage.local.set({ expire: time });
};
