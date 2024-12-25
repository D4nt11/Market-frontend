import { useClientStore } from "../store/useClientStore.ts";
import { useSellerStore } from "../store/useSellerStore.ts";
import { AuthService } from "./authService";
import { removeToken, setToken } from "./tokenService.ts";

export const authModel = {
  async loginClient(data: any) {
    try {
      const response = await AuthService.loginClient(data);
      setToken(response.data.accessToken, response.data.refreshToken);
      useClientStore.getState().login();
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    }
  },

  async registrationClient(data: any) {
    try {
      const response = await AuthService.registrationCLient(data);
      setToken(response.data.accessToken, response.data.refreshToken);
      useClientStore.getState().login();
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    }
  },

  async loginSeller(data: any) {
    try {
      const response = await AuthService.loginSeller(data);
      setToken(response.data.accessToken, response.data.refreshToken);
      useSellerStore.getState().login();
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Login failed",
      };
    }
  },

  async registrationSeller(data: any) {
    try {
      const response = await AuthService.registrationSeller(data);
      setToken(response.data.accessToken, response.data.refreshToken);
      useSellerStore.getState().login();
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
    useSellerStore.getState().logout();
    useClientStore.getState().logout();
  },
};
