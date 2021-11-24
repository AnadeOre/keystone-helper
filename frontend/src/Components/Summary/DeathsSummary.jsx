import Reac, { useState, useEffect } from 'react';
import '../../Styles/Summary/DeathsSummary.css';
import getDeathsAmounts from '../../Utils/getDeathsAmounts';

export const DeathsSummary = ({ deathEvents }) => {
  const [display, setDisplay] = useState('notdisplayed');
  const [deathNum, setDeathNum] = useState('green');
  const deathsCount = getDeathsAmounts(deathEvents);
  let deathNumber = 0;
  deathsCount.forEach(death => (deathNumber = deathNumber + death[1]));

  useEffect(() => {
    if (4 <= deathNumber <= 6) {
      setDeathNum('yellow');
    }
    if (deathNumber > 6) {
      setDeathNum('red');
    }
  }, []);

  const showDeaths = e => {
    e.preventDefault();
    setDisplay('displayed');
  };
  const hideDeaths = e => {
    e.preventDefault();
    setDisplay('notdisplayed');
  };

  return (
    <div>
      <div onMouseEnter={e => showDeaths(e)} onMouseLeave={e => hideDeaths(e)}>
        <span>Deaths: </span>
        <span className={deathNum}>{deathNumber}</span>
        <ul className={display}>
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
