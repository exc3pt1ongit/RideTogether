import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PageContext } from "@/context/PageContext";
import { UserDataContext } from "@/context/UserDataContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@tanstack/react-table";
import { CarTaxiFront } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  createdByMe: z.boolean().optional(),
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function CreatedByMeBlock<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const [createdByMeFilter, setCreatedByMe] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.createdByMe);
  }

  const { userData } = React.useContext(UserDataContext);
  const { setPageReqUrl } = React.useContext(PageContext);

  React.useEffect(() => {
    form.setValue("createdByMe", createdByMeFilter);
    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (createdByMeFilter && userData?.id) {
      currentParams.set(`CreatedBy`, userData?.id.toString());
    } else {
      currentParams.delete(`CreatedBy`);
    }

    setPageReqUrl(`${router.pathname}?${currentParams.toString()}`);
  }, [createdByMeFilter]);

  return (
    <div className="pt-6 w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="createdByMe"
            render={() => (
              <FormItem>
                {/* <div className="mb-4">
                  <FormLabel className="text-xl font-semibold">
                    Зручності
                  </FormLabel>
                </div> */}
                <FormField
                  control={form.control}
                  name="createdByMe"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-y-0 justify-between">
                        <FormLabel className="flex items-center font-normal text-muted-foreground text-base lg:whitespace-nowrap pr-5">
                          <CarTaxiFront className="w-5 h-5 mr-2" />
                          Тільки створені мною поїздки
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            defaultChecked={createdByMeFilter}
                            onCheckedChange={(e) =>
                              setCreatedByMe(!createdByMeFilter)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
