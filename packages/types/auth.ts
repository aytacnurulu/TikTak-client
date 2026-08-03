export type TokenPair = {
  access_token: string;
  refresh_token: string;
};

export type Profile = {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: string;
  created_at: string;
};

export type LoginResponse = {
  message: string;
  data: {
    tokens: TokenPair;
    profile: Profile;
  };
  result: boolean;
};

export type LoginPayload = {
  phone: string;
  password: string;
};

export type RegisterPayload = {
  full_name: string;
  phone: string;
  password: string;
};

export type RefreshResponse = {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
  result: boolean;
};