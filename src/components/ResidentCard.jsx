import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import './styles/residentCard.css';

const ResidentCard = ({ url }) => {
  const [resident, getResident] = useFetch();

  useEffect(() => {
    getResident(url);
  }, [getResident, url]); 

  return (
    <article className='resident'>
      <figure className='resident_img'>
        <img src={resident?.image} alt="resident photo" />
        <figcaption className='resident_status'>
          <div className={`resident_circle ${resident?.status}`}></div>
          <span>{resident?.status}</span>
        </figcaption>
      </figure>
      <h3 className='resident_name'>{resident?.name}</h3>
      <hr className='resident_line' />
      <ul className='resident_list'>
        <li className='resident_item'><span>Specie</span><span>{resident?.species}</span></li>
        <li className='resident_item'><span>Origin</span><span>{resident?.origin?.name}</span></li>
        <li className='resident_item'><span>Episodes where appear</span><span>{resident?.episode?.length}</span></li>
      </ul>
    </article>
  );
};

export default ResidentCard;
