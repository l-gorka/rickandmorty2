<script setup lang="ts">
import CharacterCard from 'src/components/CharacterCard.vue';
import FiltersToolbar from 'src/components/FiltersToolbar.vue';
import {
  onMounted, ref, computed,
} from 'vue';
import { useStore } from 'src/stores/store';

import { Character, Response } from 'src/types';

interface ParamsObj {
    [key: string]: string | number
  }

const store = useStore();

const charactersList = ref<Character[]>([]);
const queryObject = ref({});
const page = ref(1);
const pageCount = ref(1);

const fetchCharacters = async () => {
  await store.fetchCharacters();
  charactersList.value = (store.characters as Response).results as Character[];
  pageCount.value = (store.characters as Response).info.pages;
};

onMounted(async () => {
  fetchCharacters();
});

const handleQueryChange = (params: ParamsObj) => {
  const tempParams: ParamsObj = { ...queryObject.value };

  if (!params.page) {
    tempParams.page = 1;
    page.value = 1;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      tempParams[key] = value;
    } else {
      delete tempParams[key];
    }
  });

  queryObject.value = { ...tempParams };

  store.setFilters(tempParams);

  fetchCharacters();
};

const isResultEmpty = computed(() => charactersList.value.length === 0);

const handlePageChange = async (pageNum: number) => {
  await handleQueryChange({ page: pageNum });

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, 200);
};

</script>

<template>
  <q-page class=" q-pa-md column">
    <FiltersToolbar @change="handleQueryChange" />
    <div v-if="!isResultEmpty" class="q-mt-xl">
      <div class="row q-col-gutter-md ">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="character in charactersList" :key="`${character.name}-${character.id}`">
        <CharacterCard :character="character" />
      </div>
    </div>
     <div class="q-ma-xl flex flex-center">
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
      <div>asd</div>
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
