import {
  ref, onMounted, computed,
} from 'vue';

import { addToFavorites, removeFromFavorites, checkIfInFavorites } from 'src/functions';

import { useQuasar } from 'quasar';
import { useStore } from 'src/stores/store';

import { Character } from './types';

interface CharacterRef {
  value: Character;
}

export function useFavorites(character: CharacterRef, id: number) {
  const $q = useQuasar();

  const isFavorite = ref(false);
  const favKey = ref(0);

  onMounted(() => {
    if (character.value?.id) {
      isFavorite.value = checkIfInFavorites(character.value.id);
      return;
    }

    isFavorite.value = checkIfInFavorites(id);
  });

  const handleFavClick = () => {
    favKey.value += 1;
    if (isFavorite.value) {
      removeFromFavorites(character.value.id);
      $q.notify({
        type: 'warning',
        timeout: 1000,
        message: `${character.value.name} removed from favorites`,
      });
    } else {
      addToFavorites(character.value);
      $q.notify({
        type: 'positive',
        timeout: 1000,
        message: `${character.value.name} added to favorites`,
      });
    }

    isFavorite.value = checkIfInFavorites(character.value.id);
  };

  return { handleFavClick, isFavorite, favKey };
}

export function useScreenSize() {
  const $q = useQuasar();

  const isLargeScreen = computed(() => $q.screen.gt.sm);
  const isSmallScreen = computed(() => $q.screen.lt.sm);

  return { isLargeScreen, isSmallScreen };
}

export function useSavedScroll(routeName: string) {
  const store = useStore();

  function scrollToSaved() {
    onMounted(async () => {
      const savedScroll = store.getScrollTop[routeName];
      setTimeout(() => {
        window.scrollTo({
          top: Number(savedScroll) || 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 50);
    });
  }

  return { scrollToSaved };
}
