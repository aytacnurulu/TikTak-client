import { env } from "@/config/env";
import { getServiceAccessToken } from "../serviceAuth";

export async function serviceFetch<T>(
  path: string,
  revalidateSeconds: number,
): Promise<T> {
  const token = await getServiceAccessToken();

  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Request to ${path} failed: ${res.status}${body ? ` - ${body}` : ""}`,
    );
  }

  return res.json();
}
