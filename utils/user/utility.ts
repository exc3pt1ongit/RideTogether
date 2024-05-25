// utils/user/utility.ts

import { UserDataType } from "./types";

export const requestUserData = async (
  userId: string
): Promise<UserDataType | null | undefined> => {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/Users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((t) => t.json());

    if (response) {
      return response as UserDataType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting info about user: ", error);
    return null;
  }
};

export const updateUserData = async (
  userData: UserDataType
): Promise<UserDataType | null | undefined> => {
  try {
    const { id, ...requestUserData } = userData;

    const response = await fetch(`${process.env.SERVER_URI}/Users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestUserData),
    }).then((t) => t.json());

    if (response) {
      return response as UserDataType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating info about user: ", error);
    return null;
  }
};
