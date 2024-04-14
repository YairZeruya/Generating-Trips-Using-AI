import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserInput({ onGenerateClick }) {
  const [country, setCountry] = useState('');
  const [transportation, setTransportation] = useState('');
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleTransportationChange = (event) => {
    setTransportation(event.target.value);
  };

  const handleGenerateClick = async () => {
    await onGenerateClick(country, transportation);
    navigate('/trip-plan');
  };

  return (
    <div>
      <label>
        Enter Country Name:
        <input
          type="text"
          value={country}
          onChange={handleCountryChange}
        />
      </label>
      <br />
      <label>
        Choose Mode of Transportation:
        <select value={transportation} onChange={handleTransportationChange}>
          <option value="">Select</option>
          <option value="walking">Walking</option>
          <option value="car">Car</option>
          <option value="bicycle">Bicycle</option>
        </select>
      </label>
      <br />
      <button type="button" onClick={handleGenerateClick}>Generate</button>
    </div>
  );
}

export default UserInput;