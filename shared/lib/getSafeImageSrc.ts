const TRUSTED_IMAGE_HOSTS = ["uploads.sarkhanrahimli.dev", "encrypted-tbn0.gstatic.com"];

const FALLBACK_IMAGE_SRC = "/image/apple.svg";

export function getSafeImageSrc(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE_SRC;

  try {
    const { hostname } = new URL(url);
    return TRUSTED_IMAGE_HOSTS.includes(hostname) ? url : FALLBACK_IMAGE_SRC;
  } catch {
    return FALLBACK_IMAGE_SRC;
  }
}
