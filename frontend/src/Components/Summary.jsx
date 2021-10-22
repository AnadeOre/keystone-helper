import React, { useEffect } from "react";
import { getAffixesNames } from "../Utils/getAffixesNames";
import getDeathsAmounts from "../Utils/getDeathsAmounts";
import "../Styles/Summary.css";

export const Summary = (props) => {
	console.log("in summary");
	useEffect(() => {
		console.log(props);
	}, []);

	const roundTwoDecimals = (num) => {
		return Math.round(num * 100) / 100;
	};
	const toMinutes = (ms) => {
		return ms / (60 * 1000);
	};

	const { report } = props.props.reportData;
	const { table, fights, region, title, masterData } = report;
	const {
		averageItemLevel,
		keystoneAffixes,
		keystoneLevel,
		keystoneTime,
		gameZone,
		dungeonPulls,
	} = fights[0];
	const { totalTime, damageDone, healingDone, deathEvents } = table.data;

	const dungeonName = gameZone.name;

	// Key times
	const timeLeft = toMinutes(keystoneTime - totalTime);
	let keyTimeColor;
	if (timeLeft < 0) keyTimeColor = "untimed";
	else keyTimeColor = "timed";

	//Affixes
	const weeklyAffixes = getAffixesNames(keystoneAffixes);

	//Deaths
	const deathsCount = getDeathsAmounts(deathEvents);
	let deathNumber = 0;
	deathsCount.forEach((death) => (deathNumber = deathNumber + death.amount));
	/*
	return (
		<div>
			<p>estoye n summary</p>
		</div>
	);
	*/
	return (
		<div>
			<h1>
				{dungeonName} level {keystoneLevel}
			</h1>
			<div className='summary-container'>
				<div className='affixes-div'>
					<ul className='affixes-ul'>
						{weeklyAffixes.map((affix) => (
							<li key={affix.id} className={affix.difficulty}>
								{affix.name}
							</li>
						))}
					</ul>
				</div>
				<div className='general-div'>
					<ul>
						<li className='deaths-summary '>
							<span>Deaths: </span>
							<span>{deathNumber}</span>
							<div className='deaths-summary hide'>
								<ul>
									{deathsCount.map((death, index) => (
										<li key={index}>
											<span>{death.name}: </span>
											{death.amount}
										</li>
									))}
								</ul>
							</div>
						</li>
						<li className='av-ilvl'>
							<span>Average Item Level: </span>
							<span>{roundTwoDecimals(averageItemLevel)}</span>
						</li>
					</ul>
				</div>
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
							<span>{keystoneTime}</span>
						</li>
						<li>
							<span>Time left: </span>
							<span>{timeLeft}</span>
							<span>stars</span>
						</li>
					</ul>
				</div>
				<div className='damage-done'>
					<h4>Damage Done</h4> <ul></ul>
				</div>
				<div className='healing-done'>
					<h4>Healing Done</h4> <ul></ul>
				</div>
			</div>
		</div>
	);
};
