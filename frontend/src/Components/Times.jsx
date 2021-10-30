import React from 'react';
import { roundTwoDecimals, toMinutes } from '../Utils/UtilsFunctions';

export const Times = ({ totalTime, keystoneTime }) => {
  const timeLeft = toMinutes(keystoneTime - totalTime);
  let keyTimeColor;
  if (timeLeft < 0) keyTimeColor = 'untimed';
  else keyTimeColor = 'timed';

  return (
    <div className='times-div'>
      <ul>
        <li>
          <span>Time: </span>
          <span className={keyTimeColor}>
            {roundTwoDecimals(toMinutes(totalTime))}
          </span>
        </li>
        <li>
          <span>Key time: </span>
          <span>{roundTwoDecimals(toMinutes(keystoneTime))}</span>
        </li>
        <li>
          <span>Time left: </span>
          <span>{roundTwoDecimals(timeLeft)} </span>
        </li>
      </ul>
    </div>
  );
};
