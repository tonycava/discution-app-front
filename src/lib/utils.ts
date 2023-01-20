import type { CookieSerializeOptions } from 'cookie';
import * as process from 'process';
import Cookies from 'js-cookie';
import { goto } from '$app/navigation';
export enum INPUT {
  USERNAME = 'username',
  PASSWORD = 'password',
  MESSAGE = 'message',
}

export enum COOKEYS {
  JWT_TOKEN = 'jwt_token',
  USER = 'user',
}

// @ts-ignore
export const cookieOptions: CookieSerializeOptions = {
  path: '/',
  domain: "koomei.tonycava.dev",
  httpOnly: false,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 3
};

export const disconnect = async () => {
  Cookies.remove(COOKEYS.JWT_TOKEN);
  Cookies.remove(COOKEYS.USER);
  await goto('/login');
};