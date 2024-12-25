import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isSellerAuth: boolean;
  login: () => void;
  logout: () => void;
}

const isSeller = () => {
  if (decodeJwt() === "seller") {
    return true;
  }
  return false;
};

export const useSellerStore = create<AuthStore>((set) => ({
  isSellerAuth: Boolean(isSeller()),
  login: () => set({ isSellerAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isSellerAuth: false });
  },
}));
