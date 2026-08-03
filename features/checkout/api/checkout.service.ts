import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type {
  ApiResponse,
  Basket,
  CheckoutPayload,
  UserProfile,
} from "@tiktak/types";

export const checkoutService = {
  // TODO: profile feature-i yazılanda bura köçürülməli, ordan import olunmalıdır
  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<UserProfile>>(
      "/api/tiktak/profile",
    );
    return data.data;
  },
  getBasket: async () => {
    const { data } = await apiClient.get<ApiResponse<Basket>>(
      API.CLIENT.BASKET.LIST,
    );
    return data.data;
  },
  createOrder: async (payload: CheckoutPayload) => {
    const { data } = await apiClient.post<ApiResponse<unknown>>(
      API.CLIENT.ORDERS.CHECKOUT,
      payload,
    );
    return data;
  },
};
