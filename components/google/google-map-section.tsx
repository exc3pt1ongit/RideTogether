import React, { useContext, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const containerStyle = {
  width: "100%",
  height: "79vh",
};

export default function GoogleMapSection() {
  const { source, setSource }: any = useContext(SourceContext);
  const { destination, setDestination }: any = useContext(DestinationContext);

  const defaultLocation = { lat: 50.4501, lng: 30.5234 }; // Coordinates for Kiev
  const [center, setCenter] = useState(defaultLocation);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setCenter({
        lat: defaultLocation.lat,
        lng: defaultLocation.lng,
      });
    }
  }, []);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (source && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    if (source && destination) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if (source && destination) {
      directionRoute();
    }
  }, [destination]);

  const [directionRoutePoints, setDirectionRoutePoints]: any = useState([]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        // origin: new google.maps.LatLng(source.lat, source.lng),
        // destination: new google.maps.LatLng(destination.lat, destination.lng),
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          setDirectionRoutePoints([]);
        }
      }
    );
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: "3c90af2435f1192c",
      }}
    >
      {source ? (
        <Marker
          // position={{ lat: Number(source.lat), lng: Number(source.lng) }}
          position={new google.maps.LatLng(source.lat, source.lng)}
        />
      ) : null}

      {destination ? (
        <Marker
          // position={{
          //   lat: Number(destination.lat),
          //   lng: Number(destination.lng),
          // }}
          position={new google.maps.LatLng(destination.lat, destination.lng)}
        />
      ) : null}

      {destination && source ? (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: "#ea4335",
              strokeWeight: 5,
            },
            // suppressMarkers: true,
          }}
        />
      ) : null}
    </GoogleMap>
  );
}
