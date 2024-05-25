import { useState } from "react";
import Image from "next/image";
import MainContainer from "@/components/containers/MainContainer";
import Link from "next/link";
import GoogleMapInputAutocomplete from "@/components/google/google-input-autocomplete";

import { Button } from "@/components/ui/button";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";

export default function HomePage() {
  const [source, setSource] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey="AIzaSyArfwu-mcGxf66kLUHgaiAAG05R6F89NZk"
        >
          <MainContainer className="fixed h-screen w-screen">
            <div className="relative h-screen w-screen overflow-y-auto bg-background">
              <div className="h-screen" id="#main">
                <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                  <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[300px] md:w-[400px] gap-6">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Подорожуй разом</h1>
                        <p className="text-balance text-muted-foreground">
                          Знайдіть ідеальну поїздку на RideTogether вже зараз!
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <GoogleMapInputAutocomplete
                          label="Виїджаєте з"
                          placeholder="Введіть адресу"
                          type="source"
                        />
                        <GoogleMapInputAutocomplete
                          label="Прямуєте до"
                          placeholder="Введіть місце призначення"
                          type="destination"
                        />
                        <Button type="submit" className="w-full">
                          Знайти поїздку
                        </Button>
                      </div>
                      <div className="mt-4 text-center text-sm">
                        Хочете стати водієм?{" "}
                        <Link href="#" className="underline">
                          Докладніше
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden bg-muted lg:block h-screen">
                    <Image
                      src={`/images/first-banner-img.png`}
                      alt="Image"
                      width="1920"
                      height="1080"
                      className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </div>
              </div>
              <div className="h-screen bg-white" id="#developers">
                <div className="absolute z-[0] w-full h-[300px] top items-end select-none pointer-events-none">
                  <Image
                    src={`/images/second-banner-img.png`}
                    alt="Second banner image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
                <div className="flex flex-col justify-center h-2/5">
                  <div className="relative z-[10] md:pl-20 pb-20">
                    <h1 className="text-black font-medium text-4xl">
                      RideTogether For Developers
                    </h1>
                    <p className="text-black text-lg pt-3">
                      Наш API надає вам зручний доступ до потужних інструментів
                      для інтеграції нашої платформи в ваші додатки та сервіси.
                    </p>
                    <Button type="submit" variant="outline" className="mt-3">
                      Дізнатися більше
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </MainContainer>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
