export default function getDeathsAmounts(deaths) {
<<<<<<< HEAD
  const deathsCount = [{}, {}, {}, {}, {}];

  deaths.forEach(death => {
    deathsCount[death.id - 1].amount =
      (deathsCount[death.id - 1].amount || 0) + 1;
    deathsCount[death.id - 1].name = death.name;
  });
  return deathsCount.filter(value => Object.keys(value).length !== 0);
=======
  let deathsNames = [];
  let deathsAmount = [];
  deaths.forEach(death => deathsNames.push(death.name));
  let uniqNames = [...new Set(deathsNames)];
  let counts = {};

  for (let i = 0; i < deathsNames.length; i++) {
    if (counts[deathsNames[i]]) {
      counts[deathsNames[i]] += 1;
    } else {
      counts[deathsNames[i]] = 1;
    }
  }
  uniqNames.forEach(name => deathsAmount.push([name, counts[name]]));

  return deathsAmount;
>>>>>>> 8bfe84755dc5d8cfffe48cccd254cf78941f3707
}
