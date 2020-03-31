import React from 'react';

import './style.css';

function VolunteerItem(props) {
    const { volunteer } = props;

    return(
        <li className="volunteer-item">
            <header>
            <img src={volunteer.profile_pic_url_hd} alt={volunteer.name} />
            <div className="user-info">
                <strong>{volunteer.name}</strong>
                <span>Número de Contacto: {volunteer.contact}<br /></span>
                <span>Día Permitido: {volunteer.allowed_day}</span>
            </div>
            </header>
            <p>- {volunteer.help_desc}</p>
            <a href={`https://www.instagram.com/${volunteer.instagram_username}/`}>Ver Perfil de Instagram</a>
        </li>
    );
}

export default VolunteerItem;