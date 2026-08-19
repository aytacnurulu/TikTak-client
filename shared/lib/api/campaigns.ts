import type { ApiResponse, Campaign } from "@tiktak/types";
import { getServiceAccessToken } from "../serviceAuth";

export async function getCampaigns(): Promise<Campaign[]> {
  const token = await getServiceAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tiktak/campaigns`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Campaigns fetch failed: " + res.status);
  }

  const json: ApiResponse<Campaign[]> = await res.json();
  return json.data;
}
