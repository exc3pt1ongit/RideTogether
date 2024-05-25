import { createContext, Dispatch, SetStateAction } from "react";

type DestinationContextType = {
  destination: any[];
  setDestination: Dispatch<SetStateAction<any[]>>;
};

export const DestinationContext = createContext<DestinationContextType>({
  destination: [],
  setDestination: () => {},
});
