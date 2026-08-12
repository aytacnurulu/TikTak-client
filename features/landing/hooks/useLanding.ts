import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@tiktak/constants";
import { landingService } from "../api/landing.service";

export const useCampaignsQuery = () =>
  useQuery({
    queryKey: queryKeys.landing.campaigns,
    queryFn: landingService.getCampaigns,
  });

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: queryKeys.landing.categories,
    queryFn: landingService.getCategories,
  });
