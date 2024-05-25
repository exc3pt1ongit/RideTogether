// utils/session/utility.ts

import { parseCookies, setCookie, destroyCookie } from "nookies";
import { SessionToken, Cookies } from "./types";
import { jwtDecode } from "jwt-decode";

const SESSION_COOKIE_NAME = "session";

export const storeSession = (token: SessionToken): void => {
  setCookie(null, SESSION_COOKIE_NAME, token, {
    maxAge: 3600,
    path: "/",
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const isValidSession = (): boolean => {
  const cookies: Cookies = parseCookies();
  return cookies[SESSION_COOKIE_NAME] !== undefined;
};

export const getSessionToken = (): SessionToken | null => {
  const cookies: Cookies = parseCookies();
  return cookies[SESSION_COOKIE_NAME] || null;
};

export const extendSession = (): void => {
  const cookies: Cookies = parseCookies();
  const token: SessionToken = cookies[SESSION_COOKIE_NAME];
  if (token) {
    storeSession(token);
  }
};

export const removeSession = (): void => {
  destroyCookie(null, SESSION_COOKIE_NAME);
};

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decodedToken: any = jwtDecode(token);
    const userId: string = decodedToken.id;
    return userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
