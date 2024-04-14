import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TripPlanPage({ tripPlan }) {
  const navigate = useNavigate();

  if (!tripPlan || !tripPlan.trip_routes) {
    return <p>No trip plan available.</p>;
  }

  const tripRoutes = tripPlan.trip_routes;

  const handleTripSelect = (trip) => {
    console.log(`You selected ${trip.name}`);
    navigate(`/trip/${trip.name}`); // Assuming each trip has a unique 'name' property
  };

  return (
    <div>
      <h1>Your Trip Plan</h1>
      {tripRoutes.map((trip, index) => (
        <div key={index}>
          <h2>{trip.name}</h2>
          <p>{trip.description}</p>
          <button onClick={() => handleTripSelect(trip)}>Go to {trip.name}</button>
        </div>
      ))}
      <Link to="/">Back to home</Link>
    </div>
  );
}

export default TripPlanPage;