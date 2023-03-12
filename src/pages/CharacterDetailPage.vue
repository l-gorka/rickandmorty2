<script setup>
import { useQuasar } from 'quasar';
import {
  onMounted, ref, computed,
} from 'vue';
import { useStore } from 'src/stores/store';
import { useRoute } from 'vue-router';
import { useFavorites } from 'src/composables';

import {
  getIconsSet,
} from 'src/functions';

const route = useRoute();
const $q = useQuasar();

const paramsId = Number(route.params.id);

const store = useStore();

const character = ref(null);

const { handleFavClick, isFavorite } = useFavorites(character, paramsId);

onMounted(async () => {
  await store.fetchSingleCharacter(paramsId);

  character.value = store.singleCharacter;
});

const iconSet = computed(() => getIconsSet(character.value));

const wrapperClass = computed(() => ($q.screen.gt.xs ? 'q-mt-xl' : 'detail'));
const isLargeScreen = computed(() => $q.screen.gt.sm);
const isSmallScreen = computed(() => $q.screen.lt.sm);

</script>

<template>
<q-page class="q-pa-md wrapper">
  <q-card :class="wrapperClass" class="full-height" flat bordered>
  <div v-if="character" class="row ">
    <div class="col-12 col-sm-6 q left-side">
      <q-avatar
      v-if="isSmallScreen"
      size="132px"
      class=" overlapping"
      style="top: 16px; left: 16px;"
    >
    <q-img :src="character.image" class="col-12 col-sm-6" />
  </q-avatar>
      <q-btn
          fab
          color="primary"
          :icon="isFavorite ? 'favorite' : 'favorite_border'"
          class="absolute"
          style="top: 16px; right: 16px;"
          @click="handleFavClick"
        />
      <h2 class="col text-h4 flex q-pt-md q-px-md" :class="isSmallScreen ? 'justify-end' : ''">
        {{character.name}}
      </h2>
        <p class="text-subtitle1 text-weight-medium q-px-md flex q-pt-sm"
        :class="isSmallScreen ? 'justify-end' : ''">{{ character.location.name }}</p>
        <q-separator />
        <q-card-section>
      <div class="q-py-lg ">
        <p class="text-subtitle1 text-weight-medium flex justify-start">Lorem, ipsum dolor</p>
        <p :class="isLargeScreen ? 'q-py-lg' : ''" class="lorem">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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
    </q-card-section>
    <!-- <q-separator /> -->
    </div>
    <!-- <div class="col-12 col-sm-6"> -->
      <q-img v-if="!isSmallScreen" :src="character.image" class="col-12 col-sm-6" />
    <!-- </div> -->
  </div>
</q-card>
</q-page>

</template>

<style  lang="scss" scoped>

.wrapper {
  display: flex;
  flex-direction: column;
}

.detail {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.left-side {
  position: relative;
}

</style>
