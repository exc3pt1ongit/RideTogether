import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Checkbox } from "@/components/ui/checkbox";

type StartTimeSortSectionType = {
  id: "DepartureSixToNoon" | "DepartureNoonToSix" | "DepartureAfterSixPm";
  label: string;
};

const StartTimeSortSection: StartTimeSortSectionType[] = [
  {
    id: "DepartureSixToNoon",
    label: "06:00 - 12:00",
  },
  {
    id: "DepartureNoonToSix",
    label: "12:01 - 18:00",
  },
  {
    id: "DepartureAfterSixPm",
    label: "Після 18:00",
  },
];

const FormSchema = z.object({
  startTime: z
    .object({
      DepartureSixToNoon: z.boolean().optional(),
      DepartureNoonToSix: z.boolean().optional(),
      DepartureAfterSixPm: z.boolean().optional(),
    })
    .refine((value) => {
      return (
        value.DepartureSixToNoon ||
        value.DepartureNoonToSix ||
        value.DepartureAfterSixPm
      );
    })
    .optional(),
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function StartTimeFiltersBlock<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const isFiltered = table.getState().columnFilters.length > 0;

  const [startTimeFilter, setStartTimeFilter]: any = useState({
    DepartureSixToNoon: false,
    DepartureNoonToSix: false,
    DepartureAfterSixPm: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.startTime);
  }

  useEffect(() => {
    form.setValue("startTime", startTimeFilter);
    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    Object.entries(startTimeFilter).forEach(([filter, value]) => {
      if (value) {
        currentParams.set(filter, "true");
      } else {
        currentParams.delete(filter);
      }
    });

    const href = `${router.pathname}?${currentParams.toString()}`;
    router.push(href, undefined, { shallow: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimeFilter]);

  return (
    <div className="pt-6 w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="startTime"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-xl font-semibold">
                    Час відправлення
                  </FormLabel>
                </div>
                {StartTimeSortSection.map((item: any) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="startTime"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-y-0 justify-between"
                        >
                          <FormLabel className="flex items-center font-normal text-muted-foreground text-base lg:whitespace-nowrap pr-5">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              //   checked={field.value?.includes(item.id)}
                              //   onCheckedChange={(checked: any) => {
                              //     return checked
                              //       ? field.onChange([
                              //           ...(field.value || []),
                              //           item.id,
                              //         ])
                              //       : field.onChange(
                              //           field.value?.filter(
                              //             (value: any) => value !== item.id
                              //           )
                              //         );
                              //   }}

                              checked={startTimeFilter[item.id]}
                              onCheckedChange={(checked) =>
                                setStartTimeFilter({
                                  ...startTimeFilter,
                                  [item.id]: checked,
                                })
                              }
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
