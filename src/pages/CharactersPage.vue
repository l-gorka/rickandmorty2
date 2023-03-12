<script setup lang="ts">
import {
  onMounted, ref, computed,
} from 'vue';

import CharacterCard from 'src/components/CharacterCard.vue';
import FiltersToolbar from 'src/components/FiltersToolbar.vue';

import { useStore } from 'src/stores/store';
import { useScreenSize, useSavedScroll } from 'src/composables';

import { PAGES } from 'src/enums';

import { Character, Response } from 'src/types';

const store = useStore();

const charactersList = ref<Character[]>([]);
const page = ref(1);
const pageCount = ref(1);

const isResultEmpty = computed(() => charactersList.value.length === 0);
const pageNumber = (computed(() => store.pages[PAGES.CHARACTERS]));

const fetchCharacters = async () => {
  await store.fetchCharacters();
  charactersList.value = (store.characters as Response).results as Character[];
  pageCount.value = (store.characters as Response).info.pages;
};

const handlePageChange = async (pageNum: number) => {
  store.setPage(PAGES.CHARACTERS, pageNum);
  fetchCharacters();

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, 100);
};

const { isSmallScreen } = useScreenSize();

const { scrollToSaved } = useSavedScroll(PAGES.CHARACTERS);
scrollToSaved();

onMounted(async () => {
  page.value = store.getPages[PAGES.CHARACTERS] as number;
  fetchCharacters();
});

</script>

<template>
  <q-page class=" column" :class="{'q-pa-sm': isSmallScreen}">
    <FiltersToolbar @change="fetchCharacters" />
    <div v-if="!isResultEmpty" class="q-mt-xl">
      <div class="row q-col-gutter-sm ">
      <div class="col-xs-6 col-sm-4 col-md-3" v-for="character in charactersList" :key="`${character.name}-${character.id}`">
        <CharacterCard :character="character" :page="PAGES.CHARACTERS" />
      </div>
    </div>
     <div class="q-my-xl flex flex-center">
      <q-pagination
        v-model="pageNumber"
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
