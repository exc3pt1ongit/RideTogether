import MainContainer from "@/components/containers/MainContainer";
import GoogleMapInputAutocomplete from "@/components/google/google-input-autocomplete";
import { columns } from "@/components/pages/trips/columns";
import { DataTable } from "@/components/pages/trips/data-table";
import { DatePickerWithPresets } from "@/components/pages/trips/date-picker-with-presets";
import { Button } from "@/components/ui/button";
import { DestinationContext } from "@/context/DestinationContext";
import { PageContext } from "@/context/PageContext";
import { SourceContext } from "@/context/SourceContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

export default function TripsPage({ data }: any) {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();

  const [pageReqUrl, setPageReqUrl] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageResponseData, setPageResponseData] = useState({
    currentPage: pageNumber,
    totalPages: pageNumber,
    pageSize: pageSize,
    totalCount: 0,
  });
  const [responseData, setResponseData] = useState(data);

  const { source, setSource }: any = useContext(SourceContext);
  const { destination, setDestination }: any = useContext(DestinationContext);

  useEffect(() => {
    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    setSource([]);
    setDestination([]);

    const _pageNumber = currentParams.get("PageNumber");
    const _pageSize = currentParams.get("PageSize");

    if (!_pageNumber || !_pageSize) {
      currentParams.set("PageNumber", (1).toString());
      currentParams.set("PageSize", (10).toString());

      const href = `${router.pathname}?${currentParams.toString()}`;

      fetchData(currentParams.toString());
      router.push(href, undefined, { shallow: true });
    }
  }, []);

  useEffect(() => {
    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (responseData) {
      currentParams.set("PageNumber", pageNumber.toString());
      currentParams.set("PageSize", pageSize.toString());
    }

    setPageReqUrl(`${router.pathname}?${currentParams.toString()}`);
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const href = `${router.pathname}?${pageReqUrl.replace("/trips?", "")}`;

    console.log(pageReqUrl);

    console.log(pageReqUrl.replace("/trips?", ""));

    fetchData(pageReqUrl.replace("/trips?", ""));
    router.push(href, undefined, { shallow: true });
  }, [pageReqUrl]);

  const fetchData = async (filters: string) => {
    try {
      const url = `${process.env.SERVER_URI}/Trips?${filters}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const newData = await response.json();
      setResponseData(newData);

      setPageResponseData({
        currentPage: newData.currentPage,
        totalPages: newData.totalPages,
        pageSize: newData.pageSize,
        totalCount: newData.totalCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  const handleFindTrip = () => {
    console.log(source);
    console.log(destination);
    // console.log(date);

    // if (
    //   // !source.lat ||
    //   // !source.lng ||
    //   // !destination.lat ||
    //   // !destination.lng ||
    //   // !date
    // )
    //   return;

    const currentParams = new URLSearchParams(
      router.asPath.split("?")[1] || ""
    );

    if (source && source.lat && source.lng) {
      currentParams.set("SourceLat", source.lat);
      currentParams.set("SourceLng", source.lng);
    } else {
      currentParams.delete("SourceLat");
      currentParams.delete("SourceLng");
    }

    if (destination && destination.lat && destination.lng) {
      currentParams.set("DestinationLat", destination.lat);
      currentParams.set("DestinationLng", destination.lng);
    } else {
      currentParams.delete("DestinationLat");
      currentParams.delete("DestinationLng");
    }

    // currentParams.set("TripDate", date.toISOString());

    // const href = `${router.pathname}?${currentParams.toString()}`;

    // fetchData(currentParams.toString());
    // router.push(href, undefined, { shallow: true });

    setPageReqUrl(`${router.pathname}?${currentParams.toString()}`);
  };

  return (
    <MainContainer className="fixed h-screen w-screen" title="Поїздки">
      <PageContext.Provider
        value={{
          pageReqUrl,
          pageNumber,
          pageSize,
          setPageReqUrl,
          setPageNumber,
          setPageSize,
          pageResponseData,
          setPageResponseData,
        }}
      >
        <div className="h-full flex-1 flex-col space-y-2 md:space-y-8 p-8 md:px-20 md:flex overflow-y-auto">
          <div className="flex flex-row items-center justify-between">
            <div className="flex w-2/6 items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Список поїздок
                </h2>
                <p className="text-muted-foreground">
                  Усі доступні поїздки на платформі RideTogether!
                </p>
              </div>
            </div>
            <div className="flex w-4/6 flex-row items-center space-x-5">
              <GoogleMapInputAutocomplete
                label="Виїджаєте з"
                placeholder="Введіть адресу"
                type="source"
                className="w-[450px]"
                reqValue={source}
              />
              <GoogleMapInputAutocomplete
                label="Прямуєте до"
                placeholder="Введіть місце призначення"
                type="destination"
                className="w-[450px]"
                reqValue={destination}
              />
              {/* <DatePickerWithPresets
                label="Дата поїздки"
                className="w-full"
                date={date}
                setDate={setDate}
              /> */}
              <Button
                type="submit"
                className="w-full mt-5"
                onClick={handleFindTrip}
              >
                Знайти поїздку
              </Button>
            </div>
          </div>
          <DataTable data={responseData.items} columns={columns} />
          {/* <div className="flex">
          <ul>
            {data.map((trip: any) => (
              <li key={trip.id}>
                <Link href={`/trips/${trip.id}`}>
                  {trip.source.name} - {trip.destination.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
        </div>
      </PageContext.Provider>
    </MainContainer>
  );
}

export async function getServerSideProps({ query }: any) {
  try {
    console.log(query);

    // const { pageNumber, pageItemCount } = query;
    // console.log({ pageNumber, pageItemCount });

    // const earliestDepartureTime = query?.earliestDepartureTime === "true";

    let apiUrl = `${process.env.SERVER_URI}/Trips?PageNumber=1&PageSize=10`;
    // if (earliestDepartureTime) {
    //   apiUrl += "?earliestDepartureTime=true";
    // }

    const res = await fetch(apiUrl);
    const data = await res.json();

    return { props: { data } };
  } catch {
    return { notFound: true };
  }
}
