<script setup lang="ts">
import {
  reactive, computed, watch, defineEmits, onMounted,
} from 'vue';

import { useStore } from 'src/stores/store';

import { species, PAGES } from 'src/enums.js';

const store = useStore();

const emit = defineEmits(['change']);

const speciesItems = computed(() => species.map((item) => ({ value: item === 'All' ? '' : item, label: item })));

const state = reactive({
  species: '',
  name: '',
});

watch(state, () => {
  store.setFilters(state);
  store.setPage(PAGES.CHARACTERS, 1);
  emit('change');
});

onMounted(() => {
  Object.assign(state, store.getFilters);
});

</script>

<template>
  <div class="flex flex-center q-pa-sm">
    <q-btn-toggle
        v-model="state.species"
        class="q-ma-md"
        push
        rounded
        spread
        toggle-color="info"
        :options="speciesItems"
    ></q-btn-toggle>
      <q-input rounded outlined v-model="state.name" color="info" debounce="500" dense class="filters__input flex q-pa-md">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
  </div>
</template>

<style lang="scss">
.filters {
  &__input {
    width: min(360px, 100%);
  }
}
</style>
