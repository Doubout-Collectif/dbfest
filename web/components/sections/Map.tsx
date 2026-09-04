"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "motion/react";
import SectTitle from "../SectTitle";
import { useFrame } from "@/components/frame/Frame-context";
import { useRevealInView } from "@/components/revealAnimation/useRevealInView";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";
import { useShuffledDelays } from "@/components/revealAnimation/useShuffledDelays";
import { fadeSlideUpVariants } from "@/components/revealAnimation/reveal-variants";

type Location = {
  id: number;
  name: string;
  address: string;
  hours: string;
  lat: number;
  lng: number;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Association TANGRAM",
    address:
      "3426, Route de Baduel, Impasse du Cormoran, Cayenne 97300, Guyane française",
    hours: "28 Sept au 2 Oct",
    lat: 4.9275,
    lng: -52.2945,
  },
  {
    id: 2,
    name: "IJ Guyane",
    address:
      "81, rue des Peuples Autochtones, Cayenne 97300, Guyane française",
    hours: "29 Sept",
    lat: 4.938,
    lng: -52.321,
  },
  {
    id: 3,
    name: "E2C - École de la 2ème chance",
    address:
      "720 Rte de Remire, Remire-Montjoly 97354, Guyane française",
    hours: "30 Sept",
    lat: 4.915,
    lng: -52.3,
  },
  {
    id: 4,
    name: "La Fabrique du Dégrad",
    address:
      "Lotissement Cariacou, près de Volvo et TSO, PAE du Dégrad des Cannes, Remire-Montjoly 97354, Guyane française",
    hours: "1 Oct",
    lat: 4.865,
    lng: -52.281,
  },
  {
    id: 5,
    name: "Cercle des Lumières",
    address:
      "686, Avenue Justin Catayé, Cayenne 97300, Guyane française",
    hours: "3 Oct",
    lat: 4.9261,
    lng: -52.32672,
  },
];

const markerIcon = L.divIcon({
  className: "festival-marker",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapController({
  location,
}: {
  location: Location | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo([location.lat, location.lng], 15, {
      duration: 0.8,
    });
  }, [location, map]);

  return null;
}

function MapBounds() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      locations.map(
        (location): L.LatLngExpression => [
          location.lat,
          location.lng,
        ]
      )
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [map]);

  return null;
}

export default function FestivalMap() {
  const [activeLocation, setActiveLocation] =
    useState<Location | null>(null);
  const { mapSectionRef, mapTargetRef } = useFrame();
  usePinOnFullyVisible(mapSectionRef);
  const { ref: buttonsRef, inView: buttonsInView } =
    useRevealInView<HTMLDivElement>();
  const buttonDelays = useShuffledDelays(locations.length);

  const center: L.LatLngExpression = [5.01, -52.315];

  return (
    <section
      ref={mapSectionRef as React.RefObject<HTMLElement>}
      className="w-full px-8 py-24"
    >
      <div className="relative">
        <div className="absolute left-1/2 -top-4 z-50 -translate-1/2">
          <SectTitle title="Carte" />
        </div>

        <div
          ref={mapTargetRef}
          className="relative z-0 h-125 w-full overflow-hidden"
        >
          <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBounds />

            <MapController location={activeLocation} />

            {locations.map((location) => {
              const position: L.LatLngExpression = [
                location.lat,
                location.lng,
              ];

              return (
                <Marker
                  key={location.id}
                  position={position}
                  icon={markerIcon}
                  eventHandlers={{
                    click: () => setActiveLocation(location),
                  }}
                >
                  <Popup>
                    <strong>
                      {String(location.id).padStart(2, "0")} —{" "}
                      {location.name}
                    </strong>
                    <br />
                    {location.address}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      <div
        ref={buttonsRef}
        className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3 px-4"
      >
        {locations.map((location, index) => (
          <motion.button
            key={location.id}
            type="button"
            onClick={() => setActiveLocation(location)}
            variants={fadeSlideUpVariants}
            custom={buttonDelays[index]}
            initial="hidden"
            animate={buttonsInView ? "visible" : "hidden"}
            className="flex flex-col text-left"
          >
            <h3 className="mb-2 text-xl text-[#002518] font-thunder font-medium uppercase tracking-[0.04em]">[{location.name}]</h3>

            <p className="text-lg font-thunder tracking-[0.04em]">{location.address}</p>

            <p className="mt-2 text-base font-thunder tracking-[0.04em]">
              <strong className="font-medium">Horaire :</strong>
              <br />
              {location.hours}
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}