import MainContainer from "@/components/containers/MainContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TripResponseType } from "@/utils/trip/types";
import { UserDataType } from "@/utils/user/types";
import {
  Frown,
  CircleHelp,
  MoveLeft,
  ExternalLink,
  Users,
  Cigarette,
  PawPrint,
  Wifi,
  SunSnow,
  LucideIcon,
  CalendarIcon,
  UserSearch,
  Hourglass,
  UserRoundX,
  CircleUser,
  Trash2,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import GoogleMapSection from "@/components/google/google-map-section";
import { Checkbox } from "@/components/ui/checkbox";
import { Locale, uk } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";
import { UserAuthContext } from "@/context/UserAuthContext";
import { UserDataContext } from "@/context/UserDataContext";
import { deleteTrip } from "@/utils/trip/utility";
import { toast } from "sonner";

const notifications = [
  {
    title: "Неправильно введений ідентифікатор.",
    description:
      "Це може бути через неправильне введення або відсутність поїздки з таким ідентифікатором.",
  },
  {
    title: "Поїздка видалена або неактивна.",
    description:
      "Поїздка може бути видалена з системи або може бути неактивною з різних причин.",
  },
  {
    title: "Технічні проблеми або помилки.",
    description:
      "Іноді виникають технічні проблеми в системі, які можуть призвести до недоступності деяких поїздок.",
  },
];

type TripPageProps = {
  tripResData: TripResponseType;
  userResData: UserDataType;
  loaded: boolean;
};

type AmenitiesSectionType = {
  id:
    | "MaximumTwoPeopleBackSeat"
    | "CanSmoke"
    | "PetsAllowed"
    | "Wifi"
    | "AirConditioning";
  label: string;
  icon: LucideIcon;
};

const AmenitiesSection: AmenitiesSectionType[] = [
  {
    id: "MaximumTwoPeopleBackSeat",
    label: "Макс. двоє осіб на задньому сидінні",
    icon: Users,
  },
  {
    id: "CanSmoke",
    label: "Можна палити",
    icon: Cigarette,
  },
  {
    id: "PetsAllowed",
    label: "Можна з домашніми тваринами",
    icon: PawPrint,
  },
  {
    id: "Wifi",
    label: "Wi-Fi",
    icon: Wifi,
  },
  {
    id: "AirConditioning",
    label: "Кондиціонер",
    icon: SunSnow,
  },
];

type TripStatusesType = {
  id: number;
  label: string;
  icon: LucideIcon;
};

const TripStatuses: TripStatusesType[] = [
  {
    id: 0,
    label: "Пошук попутників",
    icon: UserSearch,
  },
  {
    id: 1,
    label: "Очікується",
    icon: Hourglass,
  },
  {
    id: 2,
    label: "Місць немає",
    icon: UserRoundX,
  },
];

export default function TripPage({
  tripResData,
  userResData,
  loaded,
}: TripPageProps) {
  const router = useRouter();

  if (!loaded)
    return (
      <MainContainer
        className="fixed h-screen w-screen"
        title="Незнайдена поїздка"
      >
        <div className="flex items-center justify-center h-5/6">
          <h2 className="text-balance text-foreground text-lg">
            <Card className={cn("w-[480px]")}>
              <CardHeader>
                <CardTitle className="flex">
                  <Frown className="mr-2" /> Такої поїздки не існує
                </CardTitle>
                <CardDescription className="pt-2">
                  Будь ласка, перевірте правильність введення/вибору або
                  зв'яжіться з адміністратором.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <CircleHelp />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Чому поїздки не існує?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Поїздки може не існувати з різних причин.
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
      </MainContainer>
    );

  const status = TripStatuses[tripResData.status];

  const { userAuth } = useContext(UserAuthContext);
  const { userData } = useContext(UserDataContext);
  const { source, setSource }: any = useContext(SourceContext);
  const { destination, setDestination }: any = useContext(DestinationContext);

  useEffect(() => {
    if (tripResData) {
      setSource({
        lat: tripResData.source.latitude,
        lng: tripResData.source.longitude,
        name: tripResData.source.name,
        label: tripResData.source.name,
      });

      setDestination({
        lat: tripResData.destination.latitude,
        lng: tripResData.destination.longitude,
        name: tripResData.destination.name,
        label: tripResData.destination.name,
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log({ source, destination });
  // }, [source, destination]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    console.log(e);
  };

  const SubmitButton = ({ statusId }: { statusId: number }) => {
    let buttonText: string;
    let buttonVariant:
      | "default"
      | "ghost"
      | "destructive"
      | "link"
      | "outline"
      | "secondary"
      | null
      | undefined;

    if (!userAuth) {
      return (
        <Button type="button" disabled variant="outline">
          На жаль, приєднатися неможливо! Зареєструйтесь або увійдіть
        </Button>
      );
    }

    if (userData?.id === tripResData?.driverId) {
      return (
        <div className="grid grid-cols-2 grid-flow-col gap-3">
          <Button
            onClick={handleOnEditClick}
            variant="outline"
            size="sm"
            className="gap-1.5 text-sm"
          >
            <Pencil className="size-4" />
            Редагувати
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                <Trash2 className="size-4" />
                Видалити
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Видалення поїздки</AlertDialogTitle>
                <AlertDialogDescription>
                  Ви впевнені, що хочете видалити вашу поїздку?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Скасувати</AlertDialogCancel>
                <AlertDialogAction onClick={handleOnDeleteClick}>
                  Видалити
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    }

    switch (statusId) {
      case 0:
        buttonText = "Приєднатися до поїздки";
        buttonVariant = "default";
        break;
      case 1:
        buttonText = "На жаль! Приєднатися неможливо :(";
        buttonVariant = "outline";
        break;
      case 2:
        buttonText = "Отакої! Усі місця вже зайнято :(";
        buttonVariant = "destructive";
        break;
      default:
        buttonText = "Невідомий статус";
        buttonVariant = "destructive";
    }

    return (
      <Button
        type="button"
        variant={buttonVariant}
        onClick={(e) => {
          e.preventDefault();

          toast("Запис на поїздку", {
            description: "Ви успішно записалися на поїздку!",
            action: {
              label: "Закрити",
              onClick: () => {},
            },
          });
        }}
      >
        {buttonText}
      </Button>
    );
  };

  const handleOnEditClick = (e: any) => {
    e.preventDefault();

    router.push(`/trips/${tripResData?.id}/edit`);
  };

  const handleOnDeleteClick = (e: any) => {
    e.preventDefault();

    deleteTrip(tripResData?.id);

    router.push(`/trips`);
  };

  const TripControl = () => {
    if (!userData?.id || !tripResData?.driverId) return null;
    if (userData?.id !== tripResData?.driverId) return null;

    return (
      <div className="grid grid-flow-col gap-1">
        <Button
          onClick={handleOnEditClick}
          variant="outline"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
        >
          <Pencil className="size-4" />
          Редагувати
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
            >
              <Trash2 className="size-4" />
              Видалити
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Видалення поїздки</AlertDialogTitle>
              <AlertDialogDescription>
                Ви впевнені, що хочете видалити вашу поїздку?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Скасувати</AlertDialogCancel>
              <AlertDialogAction onClick={handleOnDeleteClick}>
                Видалити
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  return (
    <MainContainer>
      <div className="flex flex-col px-20">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            <div className="flex items-center">
              <div className="flex space-x-2 items-center pl-2">
                <status.icon className="h-6 w-6" />
                <span className="">{status.label}</span>
              </div>
              <span className="pl-2">
                (Поїздка на RideTogether #{tripResData.id})
              </span>
            </div>
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <ExternalLink className="size-3.5" />
            Дізнатися більше про поїздки
          </Button>
          {/* <TripControl /> */}
        </header>
        <main className="grid max-h-[90vh] flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid grid-flow-col justify-between">
                  <div className="grid items-center grid-flow-row">
                    <div className="grid grid-flow-col items-center justify-start">
                      <CircleUser className="w-5 h-5" />
                      <Label className="pl-2">Водій</Label>
                    </div>
                    <Label className="text-xl">
                      <Link
                        href={`/users/${userResData.id}`}
                        className="hover:underline transition-underline duration-300 ease-linear"
                      >
                        {`${userResData.lastName} ${userResData.firstName}`}
                      </Link>
                    </Label>
                  </div>
                  <div className="pt-5 items center grid">
                    {/* <Label htmlFor="price">Ціна поїздки (у грн.)</Label> */}
                    {/* <Input
                      id="price"
                      type="input"
                      placeholder="0"
                      name="price"
                      value=
                    /> */}
                    <Label className="font-bold text-4xl">{`${tripResData.price.toFixed(
                      2
                    )} ₴`}</Label>
                  </div>
                </div>
                <div className="grid grid-flow-col gap-3">
                  <div>
                    <Label htmlFor="source">Виїджаєте з</Label>
                    <Input
                      placeholder="Введіть адресу"
                      value={source.name}
                      name="source"
                    />
                  </div>

                  <div>
                    <Label htmlFor="destination">Прямуєте до</Label>
                    <Input
                      placeholder="Введіть місце призначення"
                      value={destination.name}
                      name="destination"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-col gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="price">Початок поїздки</Label>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {tripResData.startTime ? (
                        format(
                          new Date(tripResData.startTime),
                          "d MMMM yyyy (HH:mm)",
                          {
                            locale: uk as Locale,
                          }
                        )
                      ) : (
                        <span>Час не обрано водієм</span>
                      )}
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Кінець поїздки (прораховано)</Label>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {tripResData.endTime ? (
                        format(
                          new Date(tripResData.endTime),
                          "d MMMM yyyy (HH:mm)",
                          {
                            locale: uk as Locale,
                          }
                        )
                      ) : (
                        <span>Час не обрано водієм</span>
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Зручності</Label>
                  <div className="pl-3 pt-1 pb-2">
                    <div className="flex flex-row items-center space-y-0 justify-between">
                      <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                        <Users className="w-5 h-5 mr-2" />
                        Макс. двоє осіб на задньому сидінні
                      </Label>
                      <Checkbox
                        checked={tripResData.amenities.maximumTwoPeopleBackSeat}
                      />
                    </div>
                    <div className="flex flex-row items-center space-y-0 justify-between">
                      <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                        <Cigarette className="w-5 h-5 mr-2" />
                        Можна палити
                      </Label>
                      <Checkbox checked={tripResData.amenities.canSmoke} />
                    </div>
                    <div className="flex flex-row items-center space-y-0 justify-between">
                      <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                        <PawPrint className="w-5 h-5 mr-2" />
                        Можна з домашніми тваринами
                      </Label>
                      <Checkbox checked={tripResData.amenities.petsAllowed} />
                    </div>
                    <div className="flex flex-row items-center space-y-0 justify-between">
                      <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                        <Wifi className="w-5 h-5 mr-2" />
                        Wi-Fi
                      </Label>
                      <Checkbox checked={tripResData.amenities.wifi} />
                    </div>
                    <div className="flex flex-row items-center space-y-0 justify-between">
                      <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                        <SunSnow className="w-5 h-5 mr-2" />
                        Кондиціонер
                      </Label>
                      <Checkbox
                        checked={tripResData.amenities.airConditioning}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">
                    Коментар поїздки від водія
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Розкажіть будь-які деталі поїздки попутникам!"
                    className="min-h-[9.5rem]"
                    value={tripResData.description}
                    readOnly
                  />
                </div>

                <SubmitButton statusId={tripResData.status} />
              </fieldset>
            </form>
          </div>

          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl lg:col-span-2">
            <GoogleMapSection />
          </div>
        </main>
      </div>
    </MainContainer>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { query } = context;
    const tripResponse = await fetch(
      `${process.env.SERVER_URI}/Trips/${query.id}`
    );
    const tripResData = await tripResponse.json();

    const userResponse = await fetch(
      `${process.env.SERVER_URI}/Users/${tripResData.driverId}`
    );
    const userResData = await userResponse.json();

    return {
      props: {
        tripResData: tripResData as TripResponseType,
        userResData: userResData as UserDataType,
        loaded: true,
      },
    };
  } catch {
    return {
      props: {
        loaded: false,
      },
    };
  }
}
