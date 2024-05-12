"use client";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { FC } from "react";
import { LatLngExpression } from "leaflet";

interface MapPropsType {
    location: number[];
}

const Map: FC<MapPropsType> = ({ location }) => {
    return (
        <MapContainer
            center={location as LatLngExpression}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full aspect-[3/1]"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location as LatLngExpression}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
