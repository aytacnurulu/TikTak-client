"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../api/profile.service";

export const useProfileQuery = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    enabled: options?.enabled ?? true,
  });

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
