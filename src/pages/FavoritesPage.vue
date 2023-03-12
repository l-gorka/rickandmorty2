<script setup lang="ts">
import CharacterCard from 'src/components/CharacterCard.vue';
import {
  onMounted, ref, computed,
} from 'vue';
import { useStore } from 'src/stores/store';
import { useScreenSize, useSavedScroll } from 'src/composables';

import { Character } from 'src/types';

import { getFavoriteCharacters } from 'src/functions.js';

import { PAGES } from 'src/enums';

interface ParamsObj {
    [key: string]: string | number
  }

const store = useStore();

const charactersList = ref<Character[]>([]);
const queryObject = ref({});
const page = ref(1);
const pageCount = ref(1);

const visibleList = computed(() => charactersList.value.slice((page.value - 1) * 20, page.value * 20));

const fetchCharacters = () => {
  charactersList.value = [];
  charactersList.value = getFavoriteCharacters();
  pageCount.value = Math.ceil(charactersList.value.length / 20);
};

onMounted(async () => {
  page.value = store.getPages[PAGES.FAVORITES] as number;
  fetchCharacters();
});

const handleQueryChange = (params: ParamsObj) => {
  const tempParams: ParamsObj = { ...queryObject.value };

  if (!params.page) {
    tempParams.page = 1;
    page.value = 1;
  }

  queryObject.value = { ...tempParams };

  store.setFilters(tempParams);

  fetchCharacters();
};

const isResultEmpty = computed(() => charactersList.value.length === 0);

const handlePageChange = async (pageNum: number) => {
  store.setPage(PAGES.FAVORITES, pageNum);
  await handleQueryChange({ page: pageNum });

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, 100);
};

const { isSmallScreen } = useScreenSize();

const handleFavChange = () => {
  fetchCharacters();
};

const { scrollToSaved } = useSavedScroll('favorites');
scrollToSaved();
</script>

<template>
  <q-page class=" column" :class="{'q-pa-sm': isSmallScreen, 'q-pa-md': !isSmallScreen}">
    <div v-if="!isResultEmpty" :class="{'q-mt-sm': isSmallScreen, 'q-mt-xl': !isSmallScreen}">
      <div class="row q-col-gutter-sm ">
      <div class="col-xs-6 col-sm-4 col-md-3" v-for="character in visibleList" :key="`${character.name}-${character.id}`">
        <CharacterCard :character="character" :page="PAGES.FAVORITES" @change="handleFavChange" />
      </div>
    </div>
     <div class="q-my-xl flex flex-center">
      <q-pagination
        v-model="page"
        @update:model-value="handlePageChange"
        :max="pageCount"
        :max-pages="6"
        direction-links
        color="grey"
        active-color="info"
      />
     </div>
    </div>
    <div v-else class="col column characters__no-results">
      <div class="text-h2">No results</div>
    </div>
  </q-page>
</template>

<style lang="scss">
.characters {
  &__no-results {
    display: grid;
    place-items: center;
  }
}
</style>
