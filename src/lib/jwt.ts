import {jwtDecode} from "jwt-decode";

export const decodeToken = (token: string) => {
  return jwtDecode<{
    userName: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    role: string;
  }>(token);
};
