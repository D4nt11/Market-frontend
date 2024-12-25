import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isClientAuth: boolean;
  login: () => void;
  logout: () => void;
}

const isClient = () => {
  if (decodeJwt() === "client") {
    return true;
  }
  return false;
};

export const useClientStore = create<AuthStore>((set) => ({
  isClientAuth: Boolean(isClient()),
  login: () => set({ isClientAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isClientAuth: false });
  },
}));
