import {create} from 'zustand'
import { getToken, removeToken } from '../services/tokenService'

interface AuthStore {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuth: Boolean(getToken()),
    login: () => set({ isAuth: true}),
    logout: () => {
        removeToken(true)
        set({isAuth: false})
    }
}))