export type AuthResponse = {
  access_token: string;
}

export type AuthError = {
  passwordError?: string,
  usernameError?: string
  internalError?: string
};