import { apiClient } from "@tiktak/api-client";
import { API } from "@tiktak/constants";
import type {
  ApiResponse,
  ProfileUpdatePayload,
  UserProfile,
} from "@tiktak/types";

export const profileService = {
  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<UserProfile>>(
      API.CLIENT.PROFILE.GET,
    );
    return data.data;
  },
  updateProfile: async (payload: ProfileUpdatePayload) => {
    const { data } = await apiClient.put<ApiResponse<UserProfile>>(
      API.CLIENT.PROFILE.UPDATE,
      payload,
    );
    return data.data;
  },
};
