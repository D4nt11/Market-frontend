// import { create } from "zustand";
// import { decodeJwt, removeToken } from "../services/tokenService";

// interface AuthStore {
//   isSellerAuth: boolean;
//   sellerId: string | null;
//   login: () => void;
//   logout: () => void;
// }

// interface decode{
//   type: string;
//   id: string | null;
// }

// const isSeller = async () => {
//   const decode = await <decode><unknown>decodeJwt()
//   if (decode && decode?.type === "seller") {
//     return true;
//   }
//   return false;
// };

// const getId = async () => {
//   const decode = await <decode><unknown>decodeJwt()
//   if (decode) {
//     return decode.id;
//   }
//   return null
// }

// export const useSellerStore = create<AuthStore>((set) => ({
//   isSellerAuth: Boolean(isSeller()),
//   sellerId: getId(),
//   login: () => set({ isSellerAuth: true }),
//   logout: () => {
//     removeToken(true);
//     set({ isSellerAuth: false });
//   },
// }));


import { create } from "zustand";
import { decodeJwt, removeToken } from "../services/tokenService";

interface AuthStore {
  isSellerAuth: boolean;
  sellerId: string | null;
  login: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

interface DecodedToken {
  type: string;
  id: string | null;
}

const isSeller = async (): Promise<boolean> => {
  const decoded = (await decodeJwt()) as DecodedToken;
  return decoded?.type === "seller";
};

const getId = async (): Promise<string | null> => {
  const decoded = (await decodeJwt()) as DecodedToken;
  return decoded?.id ?? null;
};

export const useSellerStore = create<AuthStore>((set) => ({
  isSellerAuth: false,
  sellerId: null,
  login: () => set({ isSellerAuth: true }),
  logout: () => {
    removeToken(true);
    set({ isSellerAuth: false, sellerId: null });
  },
  checkAuth: async () => {
    const sellerAuth = await isSeller();
    const id = await getId();
    set({ isSellerAuth: sellerAuth, sellerId: id });
  },
}));
