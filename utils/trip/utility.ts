import {
  TripUtilClientResponse,
  TripUtilResetPageNumber,
  TripUtilTripsDataFetcher,
  TripsResponseData,
  TripUtilCreateTripRequest,
} from "./types";

// public

export async function createTrip(data: TripUtilCreateTripRequest) {
  try {
    const response = await fetch(`${process.env.SERVER_URI}/Trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    console.error({ message: error.message });
  }
}

export function resetPageNumber(params: TripUtilResetPageNumber) {
  params.urlSearchParams.set("PageNumber", (1).toString());
  params.urlSearchParams.set("PageSize", (10).toString());

  const href = `${params.router.pathname}?${params.urlSearchParams.toString()}`;

  const clientResponse: TripUtilClientResponse = {
    filters: params.urlSearchParams.toString(),
    setResponseData: params.setResponseData,
    setPageResponseData: params.setPageResponseData,
  };

  updateClientTripResponses(clientResponse);
  params.router.push(href, undefined, { shallow: true });
}

export async function fetchTripsData(params: TripUtilTripsDataFetcher) {
  const req = `${process.env.SERVER_URI}/Trips?${params.filters}`;
  const res = await fetch(req);
  const data = await res.json();

  return {
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
  } as TripsResponseData;
}

export async function updateClientTripResponses(
  params: TripUtilClientResponse
) {
  const dataFetcher: TripUtilTripsDataFetcher = { filters: params.filters };
  const data = await fetchTripsData(dataFetcher);

  params.setResponseData(data);

  params.setPageResponseData({
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
  });
}

export async function updateTrip(tripId: number, tripData: any) {
  try {
    if (tripId <= 0)
      return console.log({ message: "Trip id cannot be a negative number." });

    const response = await fetch(`${process.env.SERVER_URI}/Trips/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    console.error({ message: error.message });
  }
}

export async function deleteTrip(tripId: number) {
  try {
    if (tripId <= 0)
      return console.log({ message: "Trip id cannot be a negative number." });

    const response = await fetch(`${process.env.SERVER_URI}/Trips/${tripId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.ok;
  } catch (error: any) {
    console.error({ message: error.message });
  }
}

// private
