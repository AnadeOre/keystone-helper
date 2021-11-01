import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Summary } from './Summary';
import '../Styles/ChooseFight.css';

export const ChooseFight = ({ props }) => {
  const [hasChosen, setHasChosen] = useState(null);
  const [dataRecieved, setDataRecieved] = useState(null);
  const [index, setIndex] = useState(null);
  const report = props.reportData.report;
  const [isLoading, setIsLoading] = useState(false);
  const { fights, title } = report;
  // History
  const history = useHistory();
  const code = history.location.pathname.substring(1);

  // Fetching API
  async function fetchApi(code, id, startTime, endTime) {
    setIsLoading(true);
    try {
      let res = await fetch(
        `http://localhost:3001/api/summary/${code}/${id}/${startTime}/${endTime}`
      );
      let responseIsOK = res && res.ok;
      if (responseIsOK) {
        let data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFightChoice(code, id, startTime, endTime, index) {
    const dataFromAPI = await fetchApi(code, id, startTime, endTime);

    if (!dataFromAPI.error) {
      setIsLoading(false);
      setDataRecieved(dataFromAPI);
      setIndex(index);

      setHasChosen(true);
    }
  }
  return (
    <div>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <div>
          {!hasChosen ? (
            <div className='container'>
              <h1 className='titleChoose'>Report name: {title}</h1>
              <div className='fightsContainer'>
                <h3>Choose a dungeon to analyse:</h3>
                <div className='fightsSection'>
                  {fights.map((fight, index) => (
                    <div key={index}>
                      {fight.keystoneLevel ? (
                        <button
                          className={
                            fight.gameZone.name
                              .split(' ')
                              .join('')
                              .toLowerCase() + ' choose'
                          }
                          key={fight.id}
                          onClick={() =>
                            handleFightChoice(
                              code,
                              parseInt(fight.encounterID),
                              parseInt(fight.startTime),
                              parseInt(fight.endTime),
                              index
                            )
                          }>
                          {fight.gameZone.name} Level {fight.keystoneLevel}
                        </button>
                      ) : (
                        <div className='notadungeon'>
                          {fight.gameZone.name} is not a key
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Summary data={dataRecieved} fightIndex={index} />
          )}
        </div>
      )}
    </div>
  );
};
