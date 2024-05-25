import { UserDataType } from "@/utils/user/types";
import { createContext, Dispatch, SetStateAction } from "react";

type UserDataContextType = {
  userData: UserDataType | null | undefined;
  setUserData: Dispatch<SetStateAction<UserDataType | null | undefined>>;
};

export const UserDataContext = createContext<UserDataContextType>({
  userData: null,
  setUserData: () => {},
});
