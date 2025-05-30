import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const setToken = (token: string, refreshToken: string | null) => {
  Cookies.set("token", token);
  if (refreshToken) {
    Cookies.set("refreshToken", refreshToken);
  }
};

export const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const removeToken = async (refreshToken = false) => {
  Cookies.remove("token");
  if (refreshToken) {
    Cookies.remove("refreshToken");
  }
};

export const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

interface jwt extends JwtPayload {
    type: string;
    id: string;
}

export const decodeJwt = async () => {
  const token = await getToken();
  if (token) {
    const decode = jwtDecode<jwt>(token);
    return decode;
  }
};
