import "@/styles/globals.css";
import { LoadScript } from "@react-google-maps/api";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { UserDataType } from "@/utils/user/types";
import { UserAuthContext } from "@/context/UserAuthContext";
import { UserDataContext } from "@/context/UserDataContext";
import {
  getSessionToken,
  getUserIdFromToken,
  isValidSession,
} from "@/utils/session/utility";
import { requestUserData } from "@/utils/user/utility";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [libraries] = useState<any>(["places"]);

  const [userData, setUserData] = useState<UserDataType | null | undefined>();
  const [userAuth, setUserAuth] = useState<boolean | undefined>();

  const [source, setSource] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isValidSession()) {
        setUserAuth(true);

        const token = getSessionToken();
        if (token) {
          const userId = getUserIdFromToken(token);
          if (userId) {
            const data = await requestUserData(userId);
            if (data !== null && data !== undefined) {
              setUserData(data);
            }
          }
        }
      } else {
        setUserAuth(false);
      }
    };

    fetchData();
  }, [userAuth]);

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&loading=async`}
      libraries={libraries}
    >
      <main className={inter.className}>
        <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            <SourceContext.Provider value={{ source, setSource }}>
              <DestinationContext.Provider
                value={{ destination, setDestination }}
              >
                <Component {...pageProps} />
              </DestinationContext.Provider>
            </SourceContext.Provider>
          </UserDataContext.Provider>
        </UserAuthContext.Provider>
      </main>
    </LoadScript>
  );
}
