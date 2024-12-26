import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isSellerAuth: boolean;
  sellerId: string | null;
  login: () => void;
  logout: () => void;
}

interface decode{
  type: string;
  id: string;
}

const isSeller = () => {
  const decode = <decode><unknown>decodeJwt()
  if (decode && decode?.type === "seller") {
    return true;
  }
  return false;
};

const getId = () => {
  const decode = <decode><unknown>decodeJwt()
  if (decode) {
    return decode.id;
  }
  return null
}

export const useSellerStore = create<AuthStore>((set) => ({
  isSellerAuth: Boolean(isSeller()),
  sellerId: getId(),
  login: () => set({ isSellerAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isSellerAuth: false });
  },
}));
