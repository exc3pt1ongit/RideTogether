import React, { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Label } from "../ui/label";
import { CircleArrowUp, Compass } from "lucide-react";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";

type GoogleMapInputAutocompleteProps = {
  placeholder: string;
  type: string;
  label: string;
  className?: string;
  reqValue?: string | null;
};

const GoogleMapInputAutocomplete = ({
  label,
  placeholder,
  type,
  className,
  reqValue,
}: GoogleMapInputAutocompleteProps) => {
  const [value, setValue]: any = useState(reqValue ?? null);

  const { source, setSource }: any = useContext(SourceContext);
  const { destination, setDestination }: any = useContext(DestinationContext);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const getLatAndLng = (place: any, type: any) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place?.geometry && place.geometry.location) {
        console.log(place.geometry.location.lat());
        if (type == "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="source">{label}</Label>
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
        className={`${className}`}
      >
        {type === "source" ? (
          <CircleArrowUp
            color="gray"
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
            }}
          />
        ) : (
          <Compass
            color="gray"
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "10",
            }}
          />
        )}

        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          autocompletionRequest={{
            types: ["(cities)"],
          }}
          selectProps={{
            value,
            onChange: (place) => {
              getLatAndLng(place, type);
              handleChange(place);
            },
            placeholder,
            isClearable: false,
            className:
              "flex h-10 w-full rounded-md border border-input bg-background px-5 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            components: {
              DropdownIndicator: () => null,
              LoadingIndicator: () => null,
            },
            styles: {
              input: (provided) => ({
                ...provided,
                color: "hsl(var(--primary))",
              }),
              control: (provided) => ({
                width: "100%",
              }),
              option: (provided) => ({
                ...provided,
                color: "hsl(var(--primary))",
                backgroundColor: "hsl(var(--background))",
                ":hover": {
                  backgroundColor: "hsl(var(--input))",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "hsl(var(--background))",
              }),
              menuList: (provided) => ({
                ...provided,
                border: "1px solid hsl(var(--input))",
                borderRadius: "var(--radius)",
              }),
            },
          }}
        />
      </div>
    </div>
  );
};

export default GoogleMapInputAutocomplete;
