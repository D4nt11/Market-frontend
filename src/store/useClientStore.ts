import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isClientAuth: boolean;
  clientId: string | null;
  login: () => void;
  logout: () => void;
}

interface decode{
  type: string;
  id: string;
}

const isClient = () => {
  const decode = <decode><unknown>decodeJwt()
  if (decode && decode?.type === "client") {
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

export const useClientStore = create<AuthStore>((set) => ({
  isClientAuth: Boolean(isClient()),
  clientId: getId(),
  login: () => set({ isClientAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isClientAuth: false });
  },
}));
