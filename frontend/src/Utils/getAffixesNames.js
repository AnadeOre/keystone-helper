import Affixes from '../Data/Affixes';

export default function getAffixesNames(keystoneAffixes) {
  const weeklyAffixes = [];
  for (let i = 0; i < 4; i++) {
    weeklyAffixes.push(
      Affixes.affixes.filter(
        generalAffix => generalAffix.id === keystoneAffixes[i]
      )[0]
    );
  }
  return weeklyAffixes;
}
