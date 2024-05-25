import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  CircleUser,
  Menu,
  Map,
  Sun,
  Moon,
  Github,
  LogOut,
  LucideIcon,
  Settings,
  MessageCircleQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { isValidSession, removeSession } from "@/utils/session/utility";
import { UserAuthContext } from "@/context/UserAuthContext";
import { UserDataContext } from "@/context/UserDataContext";
import { LocalTimeType } from "@/utils/time/enums";
import {
  getLocalTimeIconByType,
  getLocalTimeStringByType,
} from "@/utils/time/utility";

type HeaderItem = {
  name: string;
  href: string;
  section?: string;
};

const headerMenu: HeaderItem[] = [
  {
    name: `Спільнота`,
    href: `/`,
  },
  {
    name: `Поїздки`,
    href: `/trips`,
  },
  // {
  //   name: `Про нас`,
  //   href: `/about`,
  // },
];

type HeaderProps = {
  localTimeType: LocalTimeType | undefined;
};

const Header = ({ localTimeType }: HeaderProps) => {
  const router = useRouter();

  const [localTimeString, setLocalTimeString] = useState<string>("");
  const [LocalTimeIcon, setLocalTimeIcon]: any = useState();

  const { userAuth, setUserAuth } = useContext(UserAuthContext);
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    if (localTimeType != undefined) {
      const localTimeStringByType = getLocalTimeStringByType(localTimeType);
      setLocalTimeString(localTimeStringByType);

      const localTimeIconByTime = getLocalTimeIconByType(localTimeType);
      setLocalTimeIcon(localTimeIconByTime);
    }
  }, [localTimeType]);

  const handleLogOut = (e: any) => {
    e.preventDefault();

    setUserAuth(false);
    removeSession();
    router.push(`/`);
  };

  // useEffect(() => {
  //   router.reload()
  // }, [userAuth])

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-20">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={`/`}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Map className="h-6 w-6" />
          <span>RideTogether</span>
        </Link>

        {headerMenu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Меню навігації</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Map className="h-6 w-6" />
              <span className="sr-only">RideTogether</span>
            </Link>

            {headerMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-foreground whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative"></div>
        </form>
        <div className="flex gap-2">
          {userAuth ? (
            <div className="flex justify-center items-start gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {LocalTimeIcon && (
                      <LocalTimeIcon className="h-5 w-5 mr-2" />
                    )}
                    <span className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap">
                      {localTimeString}, {userData?.lastName}{" "}
                      {userData?.firstName}
                    </span>
                    <span className="sr-only">Меню користувача</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="flex items-center">
                    <CircleUser />
                    <div className="ml-2 flex flex-col">
                      <span>{userData?.nickname}</span>
                      <span className="text-sm text-muted-foreground">
                        {userData?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <Link href={`/users/${userData?.id}`}>
                    <DropdownMenuItem>
                      <CircleUser className="h-4 w-4 mr-2" />
                      Мій обліковий запис
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href={`/settings/account`}>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Налаштування
                    </DropdownMenuItem>
                  </Link>
                  {/* <Link href={`/support`}>
                    <DropdownMenuItem>
                      <MessageCircleQuestion className="h-4 w-4 mr-2" />
                      Підтримка
                    </DropdownMenuItem>
                  </Link> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut className="h-4 w-4 mr-1" /> Вийти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              {/* <Link href={`/help`}>
                <Button variant="outline" size="sm">
                  Допомога
                </Button>
              </Link> */}
              <Link href={`/login`}>
                <Button variant="outline" size="sm">
                  Увійти
                </Button>
              </Link>
              <Link href={`/register`}>
                <Button size="sm">Зареєструватися</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
