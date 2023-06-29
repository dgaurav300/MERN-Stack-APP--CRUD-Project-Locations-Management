import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:4000';

const Home = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
  axios.get(`${API_BASE_URL}/locations`)
  .then((response) => {
   
  setLocations(response.data);
  })
  .catch((error) => {
  console.error('Error fetching locations:', error);
  });
  }, []);
  return (
  <div>
  <h2>Locations</h2>
  <ul>
  {locations.map((location) => (
  <li key={location._id}>
  <a href={`/location/${location._id}`}>{location.name}</a> - {location.country_name}
  </li>
  ))}

  </ul>
  
  </div>
  );
  };

function App() {
  return (
    <div>
      <Home/>
    </div>
  );
}

export default App;
