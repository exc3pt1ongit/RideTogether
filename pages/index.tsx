import { useContext, useState } from "react";
import Image from "next/image";
import MainContainer from "@/components/containers/MainContainer";
import Link from "next/link";
import GoogleMapInputAutocomplete from "@/components/google/google-input-autocomplete";

import { Button } from "@/components/ui/button";
import { CarTaxiFront, FileJson2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/router";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

export default function HomePage() {
  const router = useRouter();

  const { source, setSource }: any = useContext(SourceContext);
  const { destination, setDestination }: any = useContext(DestinationContext);

  const handleFindTrip = () => {
    if (!source.lat || !source.lng || !destination.lat || !destination.lng)
      return;

    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (source) {
      currentParams.set("sourceLat", source.lat);
      currentParams.set("sourceLng", source.lng);
    } else {
      currentParams.delete("sourceLat");
      currentParams.delete("sourceLng");
    }

    if (destination) {
      currentParams.set("destinationLat", destination.lat);
      currentParams.set("destinationLng", destination.lng);
    } else {
      currentParams.delete("destinationLat");
      currentParams.delete("destinationLng");
    }

    // currentParams.set("tripDate", new Date().toLocaleDateString());

    const href = `/trips${router.pathname}?${currentParams.toString()}`;
    router.push(href, undefined, { shallow: true });
  };

  return (
    <MainContainer className="fixed h-screen w-screen" title="Головна">
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
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={handleFindTrip}
                  >
                    Знайти поїздку
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Хочете стати водієм?{" "}
                  <Link href={`/trips/create`} className="underline">
                    Створіть поїздку
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
        <div className="h-screen bg-white text-black" id="#community">
          <div className="absolute z-[0] w-full h-[300px] top items-end select-none pointer-events-none">
            <Image
              src={`/images/second-banner-img.png`}
              alt="Second banner image"
              fill
              style={{
                objectFit: "cover",
              }}
              quality={100}
            />
          </div>
          <div className="flex flex-col justify-center h-1/3 pt-20">
            <div className="relative z-[10] pl-32 pb-20">
              <h1 className="text-black font-medium text-4xl">
                RideTogether For Developers
              </h1>
              <p className="text-black text-lg pt-3">
                Наш API надає вам зручний доступ до потужних інструментів для
                інтеграції нашої платформи у ваші додатки та сервіси.
              </p>
              <Button
                type="submit"
                variant="outline"
                className="mt-3 text-foreground"
              >
                Дізнатися більше
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-20 pl-32 pr-32">
            <div className="grid gap-20 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 pt-20">
              <div>
                <CarTaxiFront />
                <div className="pt-3">
                  <span className="text-xl font-medium">Подорожуйте разом</span>
                  <div className="pt-3 text-base text-black">
                    У нашій спільноті ви можете знайти попутників, які поділяють
                    ваші інтереси до подорожей. Чи ви плануєте довгу подорож чи
                    коротку поїздку, наша платформа допоможе вам знайти
                    ідеального попутника для незабутнього досвіду.
                  </div>
                  <div className="pt-6">
                    <span className="underline font-medium">
                      Дізнатися більше
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <ShieldAlert />
                <div className="pt-3">
                  <span className="text-xl font-medium">Наш пріоритет</span>
                  <div className="pt-3 text-base text-black">
                    Ми прагнемо створити безпечне середовище для наших
                    користувачів. Ми заохочуємо відкритий діалог і взаємоповагу.
                    Ми працюємо над тим, щоб кожен користувач відчував себе в
                    безпеці під час пошуку попутників і під час подорожі.
                  </div>
                  <div className="pt-6">
                    <span className="underline font-medium">
                      Дізнатися більше
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <FileJson2 />
                <div className="pt-3">
                  <span className="text-xl font-medium">
                    Співпрацюйте з нами
                  </span>
                  <div className="pt-3 text-base text-black">
                    Проект є відкритим для всіх, хто хоче долучитися до
                    розробки. Ми раді поділитися нашим кодом на GitHub. Це
                    дозволяє працювати разом, використовуючи колективний досвід,
                    знання та креативність, щоб створити кращий сервіс пошуку
                    попутників.
                  </div>
                  <div className="pt-6">
                    <span className="underline font-medium">
                      Дізнатися більше
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2/5 bg-background" id="#drivers">
          <div className="absolute z-[0] w-full h-[300px] top items-end select-none pointer-events-none">
            <Image
              src={`/images/kiev-roads.png`}
              alt="Kiev roads image"
              fill
              style={{
                objectFit: "cover",
              }}
              quality={100}
              className="dark:brightness-[0.5] dark:grayscale"
            />
          </div>
          {/* <div className="flex flex-col justify-center h-full pt-20">
            <div className="relative z-[10] md:pl-20 pb-20">
              <div></div>
            </div>
          </div> */}
        </div>
        <div id="#about" className="h-screen bg-white text-black">
          <div className="flex flex-col justify-center items-center pt-20">
            <div className="grid gap-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <div className="w-[40vw] h-[30vw] bg-white text-black border-0 shadow-white">
                <Image
                  src={`/images/drive-1.png`}
                  width={750}
                  height={400}
                  alt="image"
                />

                <span className="text-3xl font-medium">
                  Наша відданість вашій безпеці
                </span>

                <div className="pt-3 text-base text-black">
                  Довірте свою подорож RideTogether! Ми забезпечуємо вашу
                  безпеку та комфорт під час кожної поїздки. Наші водії
                  проходять строгу перевірку, щоб ви подорожували з відчуттям
                  спокою та впевненості разом з RideTogether!
                </div>
                <div className="pt-6">
                  <span className="underline font-medium">
                    Прочитайте про наші правила для спільноти
                  </span>
                  <span className="underline font-medium pl-5">
                    Переглянути всі функції безпеки
                  </span>
                </div>
              </div>
              <div className="w-[40vw] h-[30vw] bg-white text-black border-0 shadow-white">
                <Image
                  src={`/images/drive-2.png`}
                  width={750}
                  height={400}
                  alt="image"
                  loading="lazy"
                />
                <span className="text-3xl font-medium">
                  Приводимо в рух понад 10 000 міст
                </span>
                <div className="pt-3 text-base text-black">
                  З нами ви можете подорожувати до понад 10 000 міст у всьому
                  світі! Незалежно від вашого напрямку, ми забезпечимо надійну
                  та зручну поїздку. Долучайтесь до нашої мережі та відкрийте
                  для себе нові місця разом з нами!
                </div>
                <div className="pt-6">
                  <span className="underline font-medium">
                    Переглянути всі поїздки
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
