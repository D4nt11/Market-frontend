import api from "./axios";

export const addToCart = async (clientId: string, productId: string) => {
  const response = await api.post("/cart/add", { clientId, productId });
  return response.data;
};

export const getCart = async (clientId: string) => {
  const response = await api.get(`/cart/${clientId}`);
  return response.data;
};

export const decreaseCart = async (clientId: string, productId: string) => {
  const response = await api.delete("/cart/decrease", {
    data: { clientId, productId },
  });
  return response.data;
};

export const removeFromCart = async (clientId: string, productId: string) => {
  const response = await api.delete("/cart/remove", {
    data: { clientId, productId },
  });
  return response.data;
};