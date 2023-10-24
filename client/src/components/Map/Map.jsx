import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker';

// The Map component receives 'address', 'city', and 'country' as props.
const Map = ({ address, city, country }) => {
  return (
    <MapContainer
      center={[53.35, 18.8]} // Set the initial center of the map (latitude and longitude).
      zoom={1} // Set the initial zoom level of the map.
      scrollWheelZoom={false} // Disable zooming via mouse scroll wheel.
      style={{
        height: '40vh', // Set the height of the map container.
        width: '100%', // Set the width of the map container.
        marginTop: '20px', // Add top margin to the map container.
        zIndex: 0, // Set the CSS z-index property (used for stacking elements).
      }}
    >
      {/* Add a TileLayer to the map using OpenStreetMap tiles. */}
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {/* Render the GeoCoderMarker component with the combined address, city, and country. */}
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  );
};

export default Map;
