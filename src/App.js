import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import VolunteerItem from './components/VolunteerItem';
import VolunteerForm from './components/VolunteerForm';

function App() {

  const [volunteers, setVolunteers] = useState([]);

  // List Volunteers (useEffect)
  useEffect(() => {
    // Function
    async function loadVolunteers() {
      const response = await api.get('/volunteers');
      setVolunteers(response.data);
    }
    // Execute function
    loadVolunteers();

  }, []);


  // Submit
  async function handleAddVolunteer(data){

    const response = await api.post('/volunteers', data)

    // Add to previous array (volunteers) the new one created
    setVolunteers([...volunteers, response.data]);

  }


  return (
    <>
      <div id="app-header">
        <h3>¡Bienvenido a Voluntarios!</h3>
      </div>
      <div id="app">
        <aside>
          <strong>¡Regístrate!</strong>
          <VolunteerForm onSubmit={handleAddVolunteer} />
        </aside>
        <main>
          <p className="list-title">Últimos registrados...</p>
          <ul>
            {volunteers.map(volunteer => (
              <VolunteerItem key={volunteer._id} volunteer={volunteer} />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
