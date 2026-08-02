import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type { ApiResponse, Category } from "@tiktak/types";

export const categoriesService = {
  list: async () => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>(
      API.CLIENT.CATEGORY.LIST
    );
    return data.data;
  },
};