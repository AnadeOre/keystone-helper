import React from 'react';
import Affixes from '../Data/Affixes.js';

export const BasicInfo = props => {
	const { players, affixes, keystoneLevel, dungeonName } = props.information;

	const weeklyAffixes = [];
	for (let i = 0; i < 4; i++) {
		weeklyAffixes.push(Affixes.affixes.filter(generalAffix => generalAffix.id === affixes[i])[0]);
	}

	return (
		<div>
			<h1>
				{dungeonName} level {keystoneLevel}
			</h1>
			<h3>Affixes in this run:</h3>
			<ul>
				{weeklyAffixes.map(affix => (
					<li key={affix.id}>{affix.name}</li>
				))}
			</ul>
		</div>
	);
};
