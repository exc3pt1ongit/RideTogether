import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { LocalTimeType } from "./enums";

export const getLocalTimeType = () => {
  const currentTime = new Date().getHours();
  if (currentTime >= 5 && currentTime < 12) {
    return LocalTimeType.Morning;
  } else if (currentTime >= 12 && currentTime < 18) {
    return LocalTimeType.Day;
  } else if (currentTime >= 18 && currentTime < 22) {
    return LocalTimeType.Evening;
  } else {
    return LocalTimeType.Night;
  }
};

export const getLocalTimeStringByType = (localTimeType: LocalTimeType) => {
  switch (localTimeType) {
    case LocalTimeType.Morning:
      return "Доброго ранку";
    case LocalTimeType.Day:
      return "Доброго дня";
    case LocalTimeType.Evening:
      return "Доброго вечора";
    case LocalTimeType.Night:
      return "Доброї ночі";
    default:
      return "";
  }
};

export const getLocalTimeIconByType = (localTimeType: LocalTimeType) => {
  switch (localTimeType) {
    case LocalTimeType.Morning:
      return Sunrise;
    case LocalTimeType.Day:
      return Sun;
    case LocalTimeType.Evening:
      return Sunset;
    case LocalTimeType.Night:
      return Moon;
    default:
      return null;
  }
};

export const getFormatTime = () => {
  return null;
};
