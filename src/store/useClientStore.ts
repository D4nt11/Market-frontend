import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isClientAuth: boolean;
  clientId: string | null;
  login: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

interface decode{
  type: string;
  id: string;
}

const isClient = async (): Promise<boolean> => {
  const decode = (await decodeJwt()) as decode;
  return decode?.type === "client";
};

const getId = async (): Promise<string | null> => {
  const decode = (await decodeJwt()) as decode;
  return decode?.id ?? null;

}

export const useClientStore = create<AuthStore>((set) => ({
  isClientAuth: false,
  clientId: null,
  login: () => set({ isClientAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isClientAuth: false });
  },
  checkAuth: async () => {
    const clientAuth = await isClient();
    const id = await getId();
    set({isClientAuth: clientAuth, clientId: id});
  },
}));
