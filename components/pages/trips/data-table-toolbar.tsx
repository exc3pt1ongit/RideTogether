import { Table } from "@tanstack/react-table";
import MainFiltersBlock from "./filters/main-filters-block";
import StartTimeFiltersBlock from "./filters/start-time-filters-block";
import AmenitiesFiltersBlock from "./filters/amenities-filters-block";
import CreatedByMeBlock from "./filters/created-by-me";
import { isValidSession } from "@/utils/session/utility";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { useRouter } from "next/router";
import { PageContext } from "@/context/PageContext";
import React from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();

  const { pageSize, pageNumber, pageReqUrl, setPageReqUrl } =
    React.useContext(PageContext);

  return (
    <div>
      <div className="grid grid-flow-row">
        <Button
          variant="link"
          className="space-x-1 justify-self-start p-0"
          onClick={() => {
            setPageReqUrl(`PageNumber=${pageNumber}&PageSize=${pageSize}`);
          }}
        >
          <Eraser className="size-4" />
          <span>Очистити фільтри</span>
        </Button>
        <MainFiltersBlock table={table} />
        {isValidSession() && <CreatedByMeBlock table={table} />}
        {/* <StartTimeFiltersBlock table={table} /> */}
        <AmenitiesFiltersBlock table={table} />

        {/* <div className="pt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xl font-semibold">
                      Час відправлення
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: any) => setMainFilter(value)}
                        defaultValue={MainSortSection[0].id}
                        className="space-y-1"
                      >
                        {MainSortSection.map((item) => (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-2 space-y-0 justify-between"
                          >
                            <FormLabel className="flex items-center font-normal text-muted-foreground text-base lg:whitespace-nowrap pr-5">
                              <item.icon className="w-5 h-5 mr-1" />
                              {item.label}
                            </FormLabel>
                            <FormControl>
                              <RadioGroupItem value={item.id} />
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div> */}
        {/* <Input
          placeholder="Відфільтруйте поїздки..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[400px]"
        /> */}
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
          className="flex-auto mx-2"
          />
        )} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
          column={table.getColumn("priority")}
          title="Priority"
          options={priorities}
          className="flex-auto mx-2"
          />
        )} */}
        {/* {isFiltered && (
          <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
          >
          Reset
          <ListRestart className="ml-2 h-4 w-4" />
          </Button>
          
        )} */}
      </div>
    </div>
  );
}
