import { createContext, Dispatch, SetStateAction } from "react";

type PageContextType = {
  pageReqUrl: string;
  pageNumber: number;
  pageSize: number;
  setPageReqUrl: Dispatch<SetStateAction<any>>;
  setPageNumber: Dispatch<SetStateAction<any>>;
  setPageSize: Dispatch<SetStateAction<any>>;
  pageResponseData: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
  setPageResponseData: Dispatch<
    SetStateAction<{
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalCount: number;
    }>
  >;
};

export const PageContext = createContext<PageContextType>({
  pageReqUrl: "",
  pageNumber: 1,
  pageSize: 10,
  setPageReqUrl: () => {},
  setPageNumber: () => {},
  setPageSize: () => {},
  pageResponseData: {
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    totalCount: 0,
  },
  setPageResponseData: () => {},
});
