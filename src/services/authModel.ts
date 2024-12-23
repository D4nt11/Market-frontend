import { AuthService } from "./authService";

import { useAuthStore } from "../store/useAuthStore.tsx";
import { removeToken, setToken } from "./tokenService.ts";

export const authModel = {
  async login(data: any) {
    try {
      const response = await AuthService.login(data);
      setToken(response.data.token.accessToken, response.data.refreshToken);
      useAuthStore.getState().login();
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    }
  },

  async registration(data: any) {
    try {
      const response = await AuthService.registration(data);
      setToken(response.data.accessToken, response.data.refreshToken);
      useAuthStore.getState().login();
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    }
  },

  async logout() {
    removeToken(true);
    useAuthStore.getState().logout();
  },
};
