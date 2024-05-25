import React from "react";
import MainContainer from "@/components/containers/MainContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleHelp, Frown, MoveLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { UserDataType } from "@/utils/user/types";
import { Locale, format } from "date-fns";
import { uk } from "date-fns/locale";

const notifications = [
  {
    title: "Неправильно введений ідентифікатор.",
    description:
      "Це може бути через неправильне введення або відсутність користувача з таким ідентифікатором.",
  },
  {
    title: "Користувач видалений або неактивний.",
    description:
      "Користувач може бути видалений з системи або їх акаунт може бути неактивним з різних причин.",
  },
  {
    title: "Технічні проблеми або помилки.",
    description:
      "Іноді виникають технічні проблеми в системі, які можуть призвести до недоступності деяких користувачів.",
  },
];

export default function UserPage({ userData }: { userData: UserDataType }) {
  const userExists = !userData?.details;
  const router = useRouter();

  return (
    <MainContainer className="fixed h-screen w-screen" title="Користувач">
      {userExists ? (
        <div className="flex items-center justify-center h-5/6">
          <h2 className="text-balance text-foreground text-lg">
            <Card className={cn("w-[480px]")}>
              <CardHeader>
                <CardTitle className="flex">
                  <User className="mr-2" /> Користувач RideTogether
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <CircleHelp />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Інформація про користувача.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      У цьому розділі описана детальна публічна інформація про
                      користувача, що надана при реєстрації.
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Прізвище Ім'я: {userData?.lastName}{" "}
                        {userData?.firstName} (id: {userData?.id})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Публічні прізвище та ім'я користувача.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Email: {userData?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Публічна електрона адреса користувача.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Дата реєстрація:{" "}
                        {userData?.registrationTime ? (
                          format(userData?.registrationTime, "d MMMM yyyy", {
                            locale: uk as Locale,
                          })
                        ) : (
                          <span>не завантажено</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Публічна дата реєстрації облікового запису користувача.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Роль користувача:{" "}
                        {userData?.credentials?.role?.roleName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Публічна роль користувача на платформі RideTogether.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => router.push(`/`)}>
                  <MoveLeft className="mr-2 h-4 w-4" /> Перейти на головну
                  сторінку
                </Button>
              </CardFooter>
            </Card>
          </h2>
        </div>
      ) : (
        <div className="flex items-center justify-center h-5/6">
          <h2 className="text-balance text-foreground text-lg">
            <Card className={cn("w-[480px]")}>
              <CardHeader>
                <CardTitle className="flex">
                  <Frown className="mr-2" /> Такого користувача не існує
                </CardTitle>
                <CardDescription className="pt-2">
                  Будь ласка, перевірте правильність введення або зв'яжіться з
                  адміністратором.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <CircleHelp />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Чому користувача не існує?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Користувача може не існувати з різних причин.
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => router.push(`/`)}>
                  <MoveLeft className="mr-2 h-4 w-4" /> Перейти на головну
                  сторінку
                </Button>
              </CardFooter>
            </Card>
          </h2>
        </div>
      )}
    </MainContainer>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { query } = context;
    const res = await fetch(`${process.env.SERVER_URI}/Users/${query.id}`);
    const data = await res.json();

    return { props: { userData: data as UserDataType } };
  } catch {
    return { notFound: true };
  }
}
