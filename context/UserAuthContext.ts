import { createContext, Dispatch, SetStateAction } from "react";

type UserAuthContextType = {
  userAuth: boolean | undefined;
  setUserAuth: Dispatch<SetStateAction<boolean | undefined>>;
};

export const UserAuthContext = createContext<UserAuthContextType>({
  userAuth: false,
  setUserAuth: () => {},
});
