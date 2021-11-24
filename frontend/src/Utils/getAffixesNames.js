<<<<<<< HEAD
import Affixes from '../Data/Affixes'

export function getAffixesNames(keystoneAffixes) {
  const weeklyAffixes = [];
  for (let i = 0; i < 4; i++) {
    weeklyAffixes.push(
      Affixes.affixes.filter(generalAffix => generalAffix.id === keystoneAffixes[i])[0]
    );
  }
  return weeklyAffixes;
}
=======
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
>>>>>>> 8bfe84755dc5d8cfffe48cccd254cf78941f3707
