// utils/session/signUp.ts

import { SignUpUserRequest } from "../session/types";

export const signUpUser = async (
  userData: SignUpUserRequest
): Promise<any | null> => {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // if (response.ok) {
    //   return response.json();
    // } else {
    //   const error = await ;
    //   return null;
    // }

    return response.json();
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};
