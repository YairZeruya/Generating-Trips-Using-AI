import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { generateImageFromDescription } from './api';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function TripPage({ tripPlan }) {
  const { tripName } = useParams();
  const [image, setImage] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const trip = tripPlan.trip_routes.find(trip => trip.name === tripName);

    if (trip) {
      const fetchImage = async () => {
        const generatedImage = await generateImageFromDescription(trip.description);
        setImage(generatedImage);
      };

      fetchImage();
    }
  }, [tripName, tripPlan]);

  if (!tripPlan || !tripPlan.trip_routes) {
    return <p>No trip plan available.</p>;
  }

  const trip = tripPlan.trip_routes.find(trip => trip.name === tripName);

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  const positionStart = [trip.start_coordinates.latitude, trip.start_coordinates.longitude];
  const positionEnd = [trip.end_coordinates.latitude, trip.end_coordinates.longitude];

  const Routing = () => {
    const map = useMap();
    useEffect(() => {
      L.Routing.control({
        waypoints: [
          L.latLng(positionStart[0], positionStart[1]),
          L.latLng(positionEnd[0], positionEnd[1])
        ],
        routeWhileDragging: true
      }).addTo(map);
    }, [map]);

    return null;
  }

  return (
    <div>
      <h1>{trip.name}</h1>
      <p>{trip.description}</p>
      <MapContainer center={positionStart} zoom={13} style={{ height: "400px", width: "100%" }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={positionStart}>
          <Popup>Starting Point</Popup>
        </Marker>
        <Marker position={positionEnd}>
          <Popup>Ending Point</Popup>
        </Marker>
        <Routing />
      </MapContainer>
      {image && <img src={image} alt="Tripのイメージ" />}
    </div>
  );
}

export default TripPage;