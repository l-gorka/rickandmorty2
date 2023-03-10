<script setup>
import { useQuasar } from 'quasar';
import {
  onMounted, ref, computed,
} from 'vue';
import { useStore } from 'src/stores/store';
import { useRoute } from 'vue-router';

import { getIconsSet } from 'src/functions';

const route = useRoute();

const $q = useQuasar();

const paramsId = Number(route.params.id);

const store = useStore();

const character = ref(null);

onMounted(async () => {
  await store.fetchSingleCharacter(paramsId);

  character.value = store.singleCharacter;
});

const iconSet = computed(() => getIconsSet(character.value));

const wrapperClass = computed(() => ($q.screen.gt.xs ? 'q-mt-xl' : ''));

</script>

<template>
<q-page class="q-pa-md wrapper">
  <q-card :class="wrapperClass" flat bordered>
  <div v-if="character" class="row ">
    <div class="col-12 col-sm-6 q-pa-lg left-side" :class="wrapperClass">
      <q-btn
          fab
          color="primary"
          icon="favorite_border"
          class="absolute"
          style="top: 16px; right: 16px;"
          @click="() => {}"
        />
      <h2 class="col text-h4 flex flex-center q-pt-xl">
        {{character.name}}
      </h2>
        <p class="text-subtitle1 text-weight-medium  flex flex-center q-pt-sm">{{ character.location.name }}</p>
        <q-separator />
      <div class="q-py-lg">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Eaque ea sed accusantium cumque blanditiis! Explicabo sed illo mollitia blanditiis quis.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, nisi.
        </p>
        <div class="q-pl-md q-pt-md">
        <div class="flex items-center q-pb-sm">
          <q-icon :name="iconSet.status.icon" :class="iconSet.status.color" size="32px" />
          <span class="q-pl-sm q text-subtitle1">Status: {{ character.status }}</span>
        </div>
        <div class="flex items-center q-pb-sm">
          <q-icon :name="iconSet.species" size="32px" />
          <span class="q-pl-sm q text-subtitle1">Species: {{ character.species }}</span>
        </div>
        <div class="flex items-center q-pb-sm">
          <q-icon :name="iconSet.gender" size="32px" />
          <span class="q-pl-sm q text-subtitle1">Gender: {{ character.gender }}</span>
        </div>
      </div>
    </div>
    <q-separator />
    </div>
    <!-- <div class="col-12 col-sm-6"> -->
      <q-img :src="character.image" class="col-12 col-sm-6" />
    <!-- </div> -->
  </div>
</q-card>
</q-page>

</template>

<style  lang="scss" scoped>

.wrapper {
  width: 100%;
  height: 100%;
  // margin: auto;
}

.detail {
  height: 90%;
  // max-height: 800px;
  // margin: auto 0;
}

.left-side {
  position: relative;
}

</style>
