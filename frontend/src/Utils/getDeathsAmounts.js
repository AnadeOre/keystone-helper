export default function getDeathsAmounts(deaths) {
  const deathsCount = [{}, {}, {}, {}, {}];

  deaths.forEach(death => {
    deathsCount[death.id - 1].amount =
      (deathsCount[death.id - 1].amount || 0) + 1;
    deathsCount[death.id - 1].name = death.name;
  });
  return deathsCount.filter(value => Object.keys(value).length !== 0);
}
