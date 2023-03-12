export const getIconsSet = (character) => {
  const iconSet = {};

  switch (character?.gender) {
    case 'Male':
      iconSet.gender = 'male';
      break;
    case 'Female':
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

export const addToFavorites = (character) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.find(({ id }) => id === character.id)) {
    favorites.push(character);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (characterID) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const charIndex = favorites.findIndex(({ id }) => id === characterID);
  if (charIndex > -1) {
    favorites.splice(charIndex, 1);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const checkIfInFavorites = (characterID) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return !!favorites.find(({ id }) => id === characterID);
};

export const getFavoriteCharacters = () => JSON.parse(localStorage.getItem('favorites')) || [];
