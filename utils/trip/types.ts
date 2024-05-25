// utils/trip/types.ts

import { NextRouter } from "next/router";

export type TripResponseType = {
  id: number;
  driverId: number;
  status: number;
  price: number;
  distance: number;
  startTime: string;
  endTime: string;
  source: {
    name: string;
    latitude: number;
    longitude: number;
  };
  destination: {
    name: string;
    latitude: number;
    longitude: number;
  };
  travelers: object;
  description: string;
  amenities: {
    maximumTwoPeopleBackSeat: boolean;
    canSmoke: boolean;
    petsAllowed: boolean;
    wifi: boolean;
    airConditioning: boolean;
  };

  details?: string; // if error
};

export type TripUtilCreateTripRequest = {
  driverId: number;
  startTime: string;
  source: {
    name: string;
    latitude: number;
    longitude: number;
  };
  destination: {
    name: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  amenities: {
    maximumTwoPeopleBackSeat: boolean;
    canSmoke: boolean;
    petsAllowed: boolean;
    wifi: boolean;
    airConditioning: boolean;
  };
  description: string;
};

export type TripUtilResetPageNumber = {
  router: NextRouter;
  urlSearchParams: URLSearchParams;
  setResponseData: React.Dispatch<any>;
  setPageResponseData: React.Dispatch<React.SetStateAction<TripsResponseData>>;
};

export type TripUtilTripsDataFetcher = {
  filters: string;
};

export type TripsResponseData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};

export type TripUtilClientResponse = {
  filters: string;
  setResponseData: React.Dispatch<any>;
  setPageResponseData: React.Dispatch<React.SetStateAction<TripsResponseData>>;
};
