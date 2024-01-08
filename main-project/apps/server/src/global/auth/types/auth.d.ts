export interface JwtPaylod {
  uid: string;
  email: string;
}

interface IntraSignInPayload {
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  url: string;
  phone: string;
  // displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
}

interface IntraTokenPayload {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
  secret_valid_until: number;
}

export interface TwoFactorDto{
  otp: string;
}