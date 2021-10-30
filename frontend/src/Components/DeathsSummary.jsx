import React from 'react';
import getDeathsAmounts from '../Utils/getDeathsAmounts';

export const DeathsSummary = ({ deathEvents }) => {
  const deathsCount = getDeathsAmounts(deathEvents);
  let deathNumber = 0;
  deathsCount.forEach(death => (deathNumber = deathNumber + death[1]));

  return (
    <div>
      <span>Deaths: </span>
      <span>{deathNumber}</span>
      <div className='deaths-summary hide'>
        <ul>
          {deathsCount.map((death, index) => (
            <li key={index}>
              <span>{death[0]}: </span>
              {death[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
