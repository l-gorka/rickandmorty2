export const getIconsSet = (character) => {
  const iconSet = {};

  switch (character?.gender) {
    case 'male':
      iconSet.gender = 'male';
      break;
    case 'female':
      iconSet.gender = 'female';
      break;
    default:
      iconSet.gender = 'transgender';
  }

  switch (character?.status) {
    case 'Alive':
      iconSet.status = { icon: 'sentiment_very_satisfied', color: 'text-green' };
      break;
    case 'Dead':
      iconSet.status = { icon: 'sentiment_very_dissatisfied', color: 'text-red' };
      break;
    default:
      iconSet.status = { icon: 'help_outline', color: 'text-white' };
      break;
  }

  switch (character?.species) {
    case 'Human':
      iconSet.species = 'face';
      break;
    case 'Alien':
      iconSet.species = 'pets';
      break;
    default:
      iconSet.species = 'person_4';
  }

  return iconSet;
};
