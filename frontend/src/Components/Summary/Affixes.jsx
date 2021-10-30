import React from 'react';
import getAffixesNames from '../../Utils/getAffixesNames';

export const Affixes = ({ keyAffixes }) => {
  const weeklyAffixes = getAffixesNames(keyAffixes);

  return (
    <div className='affixes-div'>
      <ul className='affixes-ul'>
        {weeklyAffixes.map(affix => (
          <li key={affix.id} className={affix.difficulty}>
            {affix.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
