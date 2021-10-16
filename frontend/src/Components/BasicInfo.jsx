import React from 'react';
import { getAffixesNames } from '../Utils/getAffixesNames';
import './BasicInfo.css';

export const BasicInfo = props => {
	const { report } = props.information.reportData;
	const { table, endTime, startTime, fights, region, title, masterData } = report;
	const { averageItemLevel, keystoneAffixes, keystoneLevel, keystoneTime, gameZone, dungeonPulls } =
		fights[0];
	const { totalTime, damageDone, healingDone, deathEvents } = table.data;
	console.log(damageDone);

	const dungeonName = gameZone.name;
	const timeKeyTook = (endTime - startTime) / (60 * 1000);
	const timeLeft = (keystoneTime - (endTime - startTime)) / (60 * 1000);

	let keyTimeColor;
	if (timeLeft < 0) keyTimeColor = 'untimed';
	else keyTimeColor = 'timed';

	//Player info:
	const players = masterData.actors;

	//Get affixes
	const weeklyAffixes = getAffixesNames(keystoneAffixes);

	return (
		<div>
			<h1>
				{dungeonName} level {keystoneLevel}
			</h1>
			<h3>Affixes in this run:</h3>
			<ul>
				{weeklyAffixes.map(affix => (
					<li key={affix.id} className={affix.difficulty}>
						{affix.name}
					</li>
				))}
			</ul>
			<p>
				This key took <span className={keyTimeColor}>{Math.round(timeKeyTook * 100) / 100}</span>{' '}
				minutes. It has an average Item level of {Math.round(averageItemLevel * 100) / 100}
			</p>
			<div>
				<h3>Players:</h3>
				<ul>
					{players.map(player => (
						<li key={player.id}>
							<span>
								{player.name}-{player.server}
							</span>{' '}
							<span className={player.subType}>{player.subType}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
