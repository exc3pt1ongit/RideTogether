// utils/session/types.ts

export type SessionToken = string;

export interface Cookies {
  [key: string]: string;
}

export type SignUpUserRequest = {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
};
