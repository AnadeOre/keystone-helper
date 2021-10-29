export default function getDeathsAmounts(deaths) {
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
}
