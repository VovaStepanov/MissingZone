"use client";

import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { FC, useEffect, useRef, useState } from "react";
import { LocationMarker } from "./LocationMarker";
// import { LeafletMouseEvent, Map as MapL } from "leaflet";

interface MapPropsType {
    onClick: (marker: number[]) => void;
}

const Map: FC<MapPropsType> = ({ onClick }) => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full aspect-[3/1]"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onClick={onClick} />
        </MapContainer>
    );
};

export default Map;
