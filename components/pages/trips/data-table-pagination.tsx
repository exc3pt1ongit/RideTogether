import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageContext } from "@/context/PageContext";
import { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();

  const {
    pageReqUrl,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    pageResponseData,
  } = useContext(PageContext);

  const [nextPageAvailable, setNextPageAvailable] = useState<boolean>(false);
  const [prevPageAvailable, setPrevPageAvailable] = useState<boolean>(false);

  const getDataAboutNextPage = async (filters: string) => {
    const req = `${process.env.SERVER_URI}/Trips?${filters}`;
    const res = await fetch(req);
    const newData = await res.json();

    return {
      currentPage: newData.currentPage,
      totalPages: newData.totalPages,
      pageSize: newData.pageSize,
      totalCount: newData.totalCount,
    };
  };

  useEffect(() => {
    setPrevPageAvailable(pageNumber > 1);

    console.log({ pageNumber, pageSize });
    console.log(pageNumber > 1);

    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (pageNumber && pageSize) {
      const fetchData = async () => {
        if (pageNumber && pageSize) {
          currentParams.set("PageNumber", (pageNumber + 1).toString());
          currentParams.set("PageSize", pageSize.toString());
        }

        const dataAboutNextPage = await getDataAboutNextPage(
          currentParams.toString()
        );

        console.log(dataAboutNextPage);

        setNextPageAvailable(dataAboutNextPage.totalCount > 0);
      };

      fetchData();
    } else {
      setNextPageAvailable(false);
    }
  }, [pageNumber, pageSize, pageReqUrl]);

  return (
    <div className="flex items-center justify-between pt-5 pb-3">
      <div className="flex-1 text-sm text-muted-foreground">
        {/* Знайдено всього: {table.getFilteredRowModel().rows.length} поїздок(-а). */}
        <span>Знайдено {pageResponseData.totalCount} поїздок(-а).</span>
        <span className="pl-2">
          Хочете стати водієм?{" "}
          <Link href={`/trips/create`} className="underline">
            Створіть поїздку
          </Link>
        </span>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Поїздок на сторінці</p>
          <Select
            // value={`${table.getState().pagination.pageSize}`}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              setPageSize(value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          {/* Сторінка {table.getState().pagination.pageIndex + 1} з{" "} */}
          Сторінка {pageNumber}
          {/* {table.getPageCount()} */}
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Перейти на першу сторінку</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              // table.previousPage();
              setPageNumber(pageNumber - 1);
            }}
            disabled={!prevPageAvailable}
          >
            <span className="sr-only">Перейти на попередню сторінку</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            // onClick={() => table.nextPage()}
            onClick={() => {
              // table.nextPage();
              setPageNumber(pageNumber + 1);
            }}
            disabled={!nextPageAvailable}
          >
            <span className="sr-only">Перейти на наступну сторінку</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Перейти на останню сторінку</span>
            <ChevronsRight className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
