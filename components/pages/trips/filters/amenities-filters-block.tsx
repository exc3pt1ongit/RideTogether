import { Table } from "@tanstack/react-table";
import {
  CircleDollarSign,
  Clock,
  LucideIcon,
  History,
  Users,
  PawPrint,
  Cigarette,
  SunSnow,
  Wifi,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { Checkbox } from "@/components/ui/checkbox";
import { PageContext } from "@/context/PageContext";
import { resetPageNumber } from "@/utils/trip/utility";
import { TripUtilResetPageNumber } from "@/utils/trip/types";

type StartTimeSortSectionType = {
  id:
    | "MaximumTwoPeopleBackSeat"
    | "CanSmoke"
    | "PetsAllowed"
    | "Wifi"
    | "AirConditioning";
  label: string;
  icon: LucideIcon;
};

const StartTimeSortSection: StartTimeSortSectionType[] = [
  {
    id: "MaximumTwoPeopleBackSeat",
    label: "Макс. двоє осіб на задньому сидінні",
    icon: Users,
  },
  {
    id: "CanSmoke",
    label: "Можна палити",
    icon: Cigarette,
  },
  {
    id: "PetsAllowed",
    label: "Можна з домашніми тваринами",
    icon: PawPrint,
  },
  {
    id: "Wifi",
    label: "Wi-Fi",
    icon: Wifi,
  },
  {
    id: "AirConditioning",
    label: "Кондиціонер",
    icon: SunSnow,
  },
];

const FormSchema = z.object({
  amenities: z
    .object({
      MaximumTwoPeopleBackSeat: z.boolean().optional(),
      CanSmoke: z.boolean().optional(),
      PetsAllowed: z.boolean().optional(),
      Wifi: z.boolean().optional(),
      AirConditioning: z.boolean().optional(),
    })
    .refine((value) => {
      return (
        value.MaximumTwoPeopleBackSeat ||
        value.CanSmoke ||
        value.PetsAllowed ||
        value.Wifi ||
        value.AirConditioning
      );
    })
    .optional(),
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function AmenitiesFiltersBlock<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();

  const { setPageReqUrl } = useContext(PageContext);

  const [amenitiesFilter, setAmenitiesFilter]: any = useState({
    MaximumTwoPeopleBackSeat: false,
    CanSmoke: false,
    PetsAllowed: false,
    Wifi: false,
    AirConditioning: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.amenities);
  }

  useEffect(() => {
    form.setValue("amenities", amenitiesFilter);
    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    Object.entries(amenitiesFilter).forEach(([filter, value]) => {
      if (value) {
        currentParams.set(`Amenities.${filter}`, "true");
      } else {
        currentParams.delete(`Amenities.${filter}`);
      }
    });

    // const resetPageNumberUtil: TripUtilResetPageNumber = {
    //   router: router,
    //   urlSearchParams: currentParams,
    //   setResponseData: setResponseData,
    //   setPageResponseData: setPageResponseData,
    // };

    // resetPageNumber(resetPageNumberUtil);

    setPageReqUrl(`${router.pathname}?${currentParams.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amenitiesFilter]);

  return (
    <div className="pt-6 w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-xl font-semibold">
                    Зручності
                  </FormLabel>
                </div>
                {StartTimeSortSection.map((item: any) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-y-0 justify-between"
                        >
                          <FormLabel className="flex items-center font-normal text-muted-foreground text-base lg:whitespace-nowrap pr-5">
                            <item.icon className="w-5 h-5 mr-2" />
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={amenitiesFilter[item.id]}
                              onCheckedChange={(checked) =>
                                setAmenitiesFilter({
                                  ...amenitiesFilter,
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
