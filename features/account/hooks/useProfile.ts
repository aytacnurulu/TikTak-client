"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@tiktak/constants";
import { profileService } from "../api/profile.service";

export const useProfileQuery = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKeys.profile.all,
    queryFn: profileService.getProfile,
    enabled: options?.enabled ?? true,
  });

export const useOrdersQuery = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: profileService.getOrders,
    enabled: options?.enabled ?? true,
  });

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    },
  });
};
