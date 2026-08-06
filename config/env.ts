
type value = string | undefined;
function requireEnv(name: string, value: value): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get API_BASE_URL(): string {
    return requireEnv(
      "NEXT_PUBLIC_API_BASE_URL",
      process.env.NEXT_PUBLIC_API_BASE_URL,
    );
  },
};
