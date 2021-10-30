import React from 'react';
import '../Styles/Summary.css';
import { roundTwoDecimals } from '../Utils/UtilsFunctions';
import { Affixes } from './Summary/Affixes';
import { DeathsSummary } from './Summary/DeathsSummary';
import { DPSSummary } from './Summary/DPSSummary';
import { HPSSummary } from './Summary/HPSSummary';
import { Times } from './Summary/Times';

export const Summary = ({ data, fightIndex }) => {
  const report = data.reportData.report;
  const { fights, masterData, region, table, title } = report;

  const {
    averageItemLevel,
    endTime,
    startTime,
    keystoneAffixes,
    keystoneLevel,
    keystoneTime,
    gameZone,
    dungeonPulls,
  } = fights[fightIndex];
  const {
    composition,
    totalTime,
    damageDone,
    healingDone,
    damageTaken,
    deathEvents,
  } = table.data;

  const dungeonName = gameZone.name;

  return (
    <div>
      <h1 className='summary-header'>
        {dungeonName} level {keystoneLevel}
      </h1>
      <div className='summary-container'>
        <Affixes keyAffixes={keystoneAffixes} />
        <div className='general-div'>
          <DeathsSummary deathEvents={deathEvents} />
          <div className='av-ilvl'>
            <span>Average Item Level: </span>
            <span>{roundTwoDecimals(averageItemLevel)}</span>
          </div>
        </div>
        <Times totalTime={totalTime} keystoneTime={keystoneTime} />
        <DPSSummary />
        <HPSSummary />
      </div>
    </div>
  );
};
