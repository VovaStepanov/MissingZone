"use client";

import { FC, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngTuple, LeafletMouseEvent, LocationEvent } from "leaflet";

interface LocationMarkerPropsType {
    onClick: (location: number[]) => void;
}

export const LocationMarker: FC<LocationMarkerPropsType> = ({ onClick }) => {
    const [position, setPosition] = useState<number[] | null>(null);
    const map = useMapEvents({
        click(e: LeafletMouseEvent) {
            console.log(e.latlng.lat, e.latlng.lng);
            setPosition([e.latlng.lat, e.latlng.lng]);
            onClick([e.latlng.lat, e.latlng.lng]);
        },
    });

    if (position) {
        return (
            <Marker position={position as LatLngTuple}>
                <Popup>Востаннє був тут.</Popup>
            </Marker>
        );
    }
};
