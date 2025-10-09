'use client';

import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapPoint {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  price: string;
}

interface MapProps {
  points: MapPoint[];
}

export default function MapboxMap({ points }: MapProps) {
  const [viewState, setViewState] = useState({
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 2
  });

  return (
    <Map
      {...viewState}
      style={{ width:"100%", height:"100%" }}
      mapStyle="mapbox://styles/mapbox/standard"
      mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
      onMove={evt => setViewState(evt.viewState)}
    >
      {points.map(point => (
        <Marker longitude={point.longitude} latitude={point.latitude} key={point.id}>
          <div className="group cursor-pointer">
            <div className="bg-rose-500 hover:bg-rose-600 rounded-full w-4 h-4 border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-110" />
            <div className="hidden group-hover:block absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
              {point.title} - {point.price}
            </div>
          </div>
        </Marker>
      ))}
    </Map>
  );
}