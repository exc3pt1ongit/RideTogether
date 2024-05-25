import MainContainer from "@/components/containers/MainContainer";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "../../settings/sidebar-nav";
import { isValidSession } from "@/utils/session/utility";
import Router from "next/router";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Обліковий запис",
    href: "/settings/account",
  },
  {
    title: "Профіль",
    href: "/settings/profile",
  },
  // {
  //   title: "Безпека",
  //   href: "/settings/security",
  // },
  {
    title: "Оформлення",
    href: "/settings/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SecurityPage({ children }: SettingsLayoutProps) {
  useEffect(() => {
    if (!isValidSession()) {
      Router.push("/login");
    }
  }, []);

  return isValidSession() ? (
    <MainContainer
      className="fixed h-screen w-screen overflow-y-auto"
      title="Налаштування"
    >
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Налаштування</h2>
          <p className="text-muted-foreground">
            Керуйте налаштуваннями свого акаунта та налаштовуйте параметри
            безпеки.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </MainContainer>
  ) : null;
}
