import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Locale, format } from "date-fns";
import { UserDataContext } from "@/context/UserDataContext";
import { uk } from "date-fns/locale";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/router";
import { UserDataType } from "@/utils/user/types";

const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Ім'я повинно складатися не менше ніж з 2 символів.",
    })
    .max(32, {
      message: "Ім'я не повинно бути довшим за 32 символи.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Прізвище повинно складатися не менше ніж з 2 символів.",
    })
    .max(32, {
      message: "Прізвище не повинно бути довшим за 32 символи.",
    }),
  dateOfRegistration: z.date().optional(),
  role: z.string().optional(),
});

const defaultValues: Partial<AccountFormValues> = {
  firstName: "",
  lastName: "",
};

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountForm() {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserDataContext);

  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const restoreUserDataValues = () => {
    if (userData) {
      setNewFirstName(userData?.firstName || "");
      setNewLastName(userData?.lastName || "");

      form.setValue("firstName", userData?.firstName || "");
      form.setValue("lastName", userData?.lastName);
    }
  };

  useEffect(() => {
    restoreUserDataValues();
  }, [userData]);

  useEffect(() => {
    form.setValue("firstName", newFirstName);
    form.setValue("lastName", newLastName);
  }, [newFirstName, newLastName]);

  function onSubmit(data: AccountFormValues) {
    if (userData) {
      const newUserData: UserDataType = {
        ...userData,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      setUserData(newUserData);
    }
  }

  useEffect(() => {
    if (userData) {
      console.log(`userData changed:`);
      console.log(userData);
    }
  }, [userData]);

  const handleSaveAccount = (e: any) => {
    e.preventDefault();

    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSaveAccount} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={() => (
              <FormItem>
                <FormLabel>Ім'я</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ім'я користувача"
                    value={newFirstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>): any => {
                      setNewFirstName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Це ім’я, яке відображатиметься у вашому профілі.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={() => (
              <FormItem>
                <FormLabel>Прізвище</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Прізвище користувача"
                    value={newLastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>): any =>
                      setNewLastName(e.target.value)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Це прізвище, яке відображатиметься у вашому профілі.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={() => (
              <FormItem>
                <FormLabel>Група користувача</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Група користувача"
                    value={userData?.credentials.role.roleName}
                  />
                </FormControl>
                <FormDescription>
                  <Link href="/help/roles" className="underline">
                    Дізнатися більше про групи користувачів
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfRegistration"
            render={() => (
              <FormItem className="flex flex-col mt-1.5">
                <FormLabel className="mb-1">Дата реєстрації</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !userData?.registrationTime && "text-muted-foreground"
                        )}
                      >
                        {userData?.registrationTime ? (
                          format(userData?.registrationTime, "d MMMM yyyy", {
                            locale: uk as Locale,
                          })
                        ) : (
                          <span>Дату реєстрації не завантажено</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                </Popover>
                <FormDescription>
                  Час, коли ваш акаунт було зареєстровано.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button">Зберегти зміни</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Підтвердження змін</AlertDialogTitle>
              <AlertDialogDescription>
                Ви впевнені, що хочете зберегти зміни?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Скасувати</AlertDialogCancel>
              <AlertDialogAction onClick={handleSaveAccount}>
                Зберегти
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </form>
    </Form>
  );
}
