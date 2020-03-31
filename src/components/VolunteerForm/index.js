import React, { useEffect, useState } from 'react';

import './style.css';

function VolunteerForm({ onSubmit }) {

    // Create States for all vars
    const [instagram_username, setInstagramUsername] = useState('');
    const [name, setName] = useState('');
    const [allowed_day, setAllowedDay] = useState('Lunes');
    const [help_desc, setHelpDesc] = useState('');
    const [contact, setContact] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const [error_msg, setErrorMsg] = useState(false);
    const [registered_msg, setRegisteredMsg] = useState(false);

    // useEffect: to execute only the first time in our component as [] empty
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            setLatitude(latitude);
            setLongitude(longitude);

        },
        (err) => {
            console.log(err);
        },
        {
          timeout:30000,
        }
        );
    }, []);


    async function handleSubmit(e) {

        e.preventDefault();

        // Check if Instagram user or Name
        if (!instagram_username && !name){
          setErrorMsg(true);
          return false;
        }
        
        await onSubmit({
            instagram_username,
            name,
            allowed_day,
            help_desc,
            contact,
            latitude,
            longitude,
          });

        setInstagramUsername('');
        setName('');
        setAllowedDay('');
        setHelpDesc('');
        setContact('');
        setErrorMsg(false);
        setRegisteredMsg(true);

    }

    return (
        <form onSubmit={handleSubmit}>
          <label>Si tienes Instagram, permítenos tomar tu Nombre y Foto :)</label>
          <div className="input-block">
            <label htmlFor="instagram_username">Usuario en Instagram:</label>
            <input name="instagram_username" id="instagram_username" value={instagram_username} onChange={e => setInstagramUsername(e.target.value)} />
          </div>
          <label>Si no tienes no importa, empieza desde acá :)</label>
          <div className="input-block">
            <label htmlFor="name">Nombre y Apellido:</label>
            <input name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="allowed_day">¿Tu día permitido para salir?</label>
            <select name="allowed_day" id="allowed_day" value={allowed_day} onChange={e => setAllowedDay(e.target.value)}>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miercoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="help_desc">Serás voluntario para...</label>
            <input name="help_desc" id="help_desc" required placeholder="Ej. Voluntario para compras, voluntario para..." value={help_desc} onChange={e => setHelpDesc(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="contact">Tu número de contacto:</label>
            <input name="contact" id="contact" required value={contact} onChange={e => setContact(e.target.value)} />
          </div>
          <label>Tus coordenadas para el mapa en la aplicación se llenarán automaticamente :)</label>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitud:</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitud:</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <label className={error_msg ? "error-msg-show" : "msg"}>Debes darnos tu Nombre o tu usuario de Instagram</label>
          <label className={registered_msg ? "registered-msg-show" : "msg"}>¡Gracias! Fuiste Registrado.</label>
          <button type="submit">Regístrame</button>
        </form>
    );
}

export default VolunteerForm;