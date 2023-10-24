import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// Define the default marker icon using Leaflet's L.icon constructor.
let DefaultIcon = L.icon({
  iconUrl: icon, // Set the icon URL to the default marker icon image.
  shadowUrl: iconShadow // Set the shadow URL for the marker icon.
});

// Set the default marker icon for all markers using L.Marker.prototype.options.icon.
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap(); // Access the Leaflet map instance from the parent component.
  const [position, setPosition] = useState([60, 19]); // Initialize the marker's initial position.

  useEffect(() => {
    // Use the useEffect hook to perform side effects (e.g., fetching data) after rendering.

    // Use Esri Leaflet Geocoder to geocode the provided 'address'.
    ELG.geocode().text(address).run((err, results, response) => {
      if (results?.results?.length > 0) {
        // Check if geocoding results are available.

        // Extract latitude and longitude from the first result.
        const { lat, lng } = results?.results[0].latlng;

        // Update the marker's position to the geocoded location.
        setPosition([lat, lng]);

        // Fly to the geocoded location on the map with a zoom level of 6.
        map.flyTo([lat, lng], 6);
      }
    });
  }, [address]); // Execute this effect whenever 'address' prop changes.

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup /> {/* Display a popup when clicking the marker (you can add content to the popup). */}
    </Marker>
  );
};

export default GeoCoderMarker;
