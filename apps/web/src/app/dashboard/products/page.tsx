'use client'

import React, { useState, useCallback } from 'react';
import { CardSwipe } from '@/components/ui/swipe-card';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { MapPin } from 'lucide-react';

const images = [
   {
     src: '',
     alt: 'Image 1',
   },
];

const ServicePage = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleMapClick = useCallback(async () => {
    setLoading(true);
    setInitialLoad(false);
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      <div className="px-4 sm:px-6 py-6 sm:py-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-muted text-muted-foreground rounded-full border">
          Service Locator
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3 text-balance">
          Find Services Near You
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed text-sm sm:text-base">
          Click on the map to select a location and view available services in that area.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mx-auto px-4 sm:px-0 md:pb-16">
        {/* Map Section */}
        <section className="w-full md:w-2/3 lg:w-2/4 sm:bg-muted/50 rounded-xl sm:border p-4 sm:p-6 pb-6 sm:pb-8">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground mb-1">
              Select a Location
            </h2>
            <p className="text-sm text-muted-foreground">
              Click on the map to place a pin.
            </p>
          </div>
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border">
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN'}
              initialViewState={{
                longitude: -98.5795,
                latitude: 39.8283,
                zoom: 3.5
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onClick={handleMapClick}
            >
              {/*{selectedLocation && (
                <Marker
                  longitude={19}
                  latitude={23}
                  anchor="bottom"
                >
                  <MapPin className="w-8 h-8 text-blue-600" fill="currentColor" />
                </Marker>
              )}*/}
            </Map>
          </div>
        </section>

        {/* Services Section */}
        <aside className="w-full max-w-xl">
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg font-medium text-foreground mb-1">
              Available Services
            </h2>
            <p className="text-sm text-muted-foreground">
              Services available at the selected location.
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[250px]">
            {initialLoad && (
              <div className="text-center text-muted-foreground text-sm">
                Please select a location on the map.
              </div>
            )}
            
            {loading && (
              <div className="text-center text-muted-foreground text-sm">
                Loading services...
              </div>
            )}

            {!loading && !initialLoad && (
              <CardSwipe slideShadows={true} images={images}/>
            )}

            {!loading && !initialLoad && (
                <div className="text-center text-muted-foreground text-sm">
                    No services found for this location.
                </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ServicePage;
