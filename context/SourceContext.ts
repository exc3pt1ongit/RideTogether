import { createContext, Dispatch, SetStateAction } from "react";

type SourceContextType = {
  source: any[];
  setSource: Dispatch<SetStateAction<any[]>>;
};

export const SourceContext = createContext<SourceContextType>({
  source: [],
  setSource: () => {},
});
