import MainContainer from "@/components/containers/MainContainer";
import { DateTimePicker } from "@/components/date-and-time/date-time-picker";
import GoogleMapInputAutocomplete from "@/components/google/google-input-autocomplete";
import GoogleMapSection from "@/components/google/google-map-section";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { UserDataContext } from "@/context/UserDataContext";
import { isValidSession } from "@/utils/session/utility";
import { createTrip } from "@/utils/trip/utility";
import {
  Cigarette,
  CirclePlus,
  ExternalLink,
  LucideIcon,
  PawPrint,
  SunSnow,
  Users,
  Wifi,
} from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { number, z } from "zod";

type AmenitiesSectionType = {
  id:
    | "maximumTwoPeopleBackSeat"
    | "canSmoke"
    | "petsAllowed"
    | "wifi"
    | "airConditioning";
  label: string;
  icon: LucideIcon;
};

const AmenitiesSection: AmenitiesSectionType[] = [
  {
    id: "maximumTwoPeopleBackSeat",
    label: "Макс. двоє осіб на задньому сидінні",
    icon: Users,
  },
  {
    id: "canSmoke",
    label: "Можна палити",
    icon: Cigarette,
  },
  {
    id: "petsAllowed",
    label: "Можна з домашніми тваринами",
    icon: PawPrint,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    icon: Wifi,
  },
  {
    id: "airConditioning",
    label: "Кондиціонер",
    icon: SunSnow,
  },
];

const tripSchema = z.object({
  driverId: z.number().nonnegative(),
  startTime: z.string(),
  source: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  destination: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  price: z.number().nonnegative(),
  amenities: z.object({
    maximumTwoPeopleBackSeat: z.boolean(),
    canSmoke: z.boolean(),
    petsAllowed: z.boolean(),
    wifi: z.boolean(),
    airConditioning: z.boolean(),
  }),
  description: z.string(),
});

export default function CreateTripPage() {
  const router = useRouter();

  React.useEffect(() => {
    if (!isValidSession()) {
      router.push(`/trips`);
    }
  }, []);

  const [amenitiesFilter, setAmenitiesFilter]: any = React.useState({
    maximumTwoPeopleBackSeat: false,
    canSmoke: false,
    petsAllowed: false,
    wifi: false,
    airConditioning: false,
  });

  const [price, setPrice] = React.useState<number>(0);
  const [description, setDescription] = React.useState("");
  const [startTime, setStartTime] = React.useState<Date>(new Date());

  const { userData, setUserData }: any = React.useContext(UserDataContext);
  const { source, setSource }: any = React.useContext(SourceContext);
  const { destination, setDestination }: any =
    React.useContext(DestinationContext);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      driverId: userData?.id,
      startTime: startTime?.toISOString(),
      price,
      source: {
        name: source.name,
        latitude: source.lat,
        longitude: source.lng,
      },
      destination: {
        name: destination.name,
        latitude: destination.lat,
        longitude: destination.lng,
      },
      amenities: amenitiesFilter,
      description,
    };

    const result = tripSchema.safeParse(data);

    if (!result.success) {
      // Handle validation errors here
      console.error(result.error);
      console.log(data);
      return;
    }

    console.log("Submitted data:", result.data);

    createTrip(result.data);

    router.push(`/trips`);
  };

  return (
    <MainContainer>
      <div className="flex flex-col px-20">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            <div className="flex space-x-2 items-center pl-2">
              <CirclePlus className="size-6" />
              <span>Створення поїздки</span>
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
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3">
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
                </div>
                <div className="grid grid-flow-col gap-5">
                  <div className="grid gap-3">
                    <Label htmlFor="price">Ціна поїздки (у грн.)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="150"
                      name="price"
                      onChange={(e: any) =>
                        setPrice(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Дата та час поїздки</Label>
                    <DateTimePicker date={startTime} setDate={setStartTime} />
                  </div>
                </div>
                <div>
                  <Label>Зручності</Label>
                  <div className="pl-3 pt-1 pb-2">
                    {AmenitiesSection.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-row items-center space-y-0 justify-between"
                      >
                        <Label className="flex items-center font-normal text-muted-foreground lg:whitespace-nowrap pr-5 pt-2">
                          <item.icon className="w-5 h-5 mr-2" />
                          {item.label}
                        </Label>
                        <Checkbox
                          checked={amenitiesFilter[item.id]}
                          onCheckedChange={(checked) =>
                            setAmenitiesFilter({
                              ...amenitiesFilter,
                              [item.id]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">
                    Додайте коментар до вашої поїздки (необов'язково)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Розкажіть будь-які деталі поїздки попутникам!"
                    className="min-h-[9.5rem]"
                    onChange={(e: any) => setDescription(e.target.value)}
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button">Опублікувати поїздку</Button>
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
                      <AlertDialogAction onClick={onSubmit}>
                        Зберегти
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
