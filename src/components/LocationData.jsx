import React from 'react';
import './styles/locationData.css';

const LocationData = ({ location }) => {
  return (
    <div>
      <section className='location'>
        <h2 className='location_name'>{location?.name}</h2>
        <ul className='location_list'>
          <li className='location_item'><span>Type: </span><span>{location?.type}</span></li>
          <li className='location_item'><span>Dimension: </span><span>{location?.dimension}</span></li>
          <li className='location_item'><span>Population: </span><span>{location?.residents?.length}</span></li>
        </ul>
      </section>
    </div>
  );
};

export default LocationData;
