import { Table } from "@tanstack/react-table";
import {
  CircleDollarSign,
  Clock,
  LucideIcon,
  History,
  CircleArrowUp,
  Compass,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext, useEffect, useState } from "react";
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
import { PageContext } from "@/context/PageContext";

type MainSortSectionType = {
  id:
    | "EarliestDepartureTime"
    | "LowestPrice"
    // | "DeparturePlaceClose"
    // | "ArrivalPlaceClose"
    | "ShortestTrip";
  label: string;
  icon: LucideIcon;
};

const MainSortSection: MainSortSectionType[] = [
  {
    id: "EarliestDepartureTime",
    label: "Найраніший час відправлення",
    icon: Clock,
  },
  {
    id: "LowestPrice",
    label: "Найнижча ціна",
    icon: CircleDollarSign,
  },
  // {
  //   id: "DeparturePlaceClose",
  //   label: "Близько до місця відправлення",
  //   icon: CircleArrowUp,
  // },
  // {
  //   id: "ArrivalPlaceClose",
  //   label: "Близько до місця прибуття",
  //   icon: Compass,
  // },
  {
    id: "ShortestTrip",
    label: "Найкоротша поїздка",
    icon: History,
  },
];

const FormSchema = z.object({
  type: z.enum(["EarliestDepartureTime", "LowestPrice", "ShortestTrip"], {
    required_error: "Вам потрібно обрати один з варіантів.",
  }),
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function MainFiltersBlock<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();

  const [mainFilter, setMainFilter]: any = useState(MainSortSection[0].id);

  const { setPageReqUrl } = useContext(PageContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.type);
  }

  useEffect(() => {
    form.setValue("type", mainFilter);

    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (mainFilter) {
      currentParams.set("MainFilter", mainFilter);
    }

    setPageReqUrl(`${router.pathname}?${currentParams.toString()}`);
  }, [mainFilter]);

  return (
    <div className="pt-3 w-[350px]">
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
                  Сортувати за
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
                        className="flex items-center space-x-12 space-y-0 justify-between"
                      >
                        <FormLabel className="flex items-center font-normal text-muted-foreground text-base lg:whitespace-nowrap pr-5">
                          <item.icon className="w-5 h-5 mr-2" />
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
    </div>
  );
}
