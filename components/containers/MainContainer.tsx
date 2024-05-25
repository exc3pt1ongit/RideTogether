import React, { useEffect, useState } from "react";
import Header from "../Header";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { getLocalTimeType } from "@/utils/time/utility";
import { LocalTimeType } from "@/utils/time/enums";
import { Toaster } from "../ui/sonner";

type MainContainerProps = {
  children: any;
  className?: string;
  title?: string;
};

const MainContainer = ({ children, className, title }: MainContainerProps) => {
  const [localTimeType, setLocalTimeType] = useState<LocalTimeType>();

  useEffect(() => {
    const getCurrentTimeOfDay = () => {
      const currentTimeType = getLocalTimeType();
      setLocalTimeType(currentTimeType);
    };

    getCurrentTimeOfDay();

    const timer = setInterval(() => {
      getCurrentTimeOfDay();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="h-screen w-screen">
      <Head>
        <title>RideTogether | {title ? title : "Подорожуйте разом!"}</title>
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header localTimeType={localTimeType} />
        <div className={`${className}`}>{children}</div>
        <Toaster />
      </ThemeProvider>
    </main>
  );
};

export default MainContainer;
