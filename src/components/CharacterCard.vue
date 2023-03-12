<script setup lang="ts">
import {
  defineProps, computed, ref, watch, defineEmits,
} from 'vue';

import { useRouter } from 'vue-router';
import { useFavorites } from 'src/composables';
import { useStore } from 'src/stores/store';

import { getIconsSet } from 'src/functions';

import { Character } from 'src/types';

const router = useRouter();
const store = useStore();

const props = defineProps<{
  character: Character
  page: string
}>();

const emit = defineEmits(['change']);
const characterRef = ref<Character>(props.character);

const { handleFavClick, isFavorite, favKey } = useFavorites(characterRef, 0);

const icons = computed(() => getIconsSet(props.character));

const handleOpenDetails = () => {
  store.setScrollTop(props.page, window.scrollY);
  router.push({ path: `details/${props.character.id}` });
};

watch(favKey, () => {
  emit('change', favKey.value);
});

</script>

<template>
    <q-card class="character-card" square bordered flat>
      <q-img :src="character.image" loading="lazy" @click="handleOpenDetails" />
      <q-card-section>
        <q-btn
          fab
          color="primary"
          :icon="isFavorite ? 'favorite' : 'favorite_border'"
          class="absolute"
          style="top: -10px; right: 4px; transform: translateY(-50%);"
          @click="handleFavClick"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis" @click="handleOpenDetails">
            {{character.name}}
          </div>
        </div>
        <div class="text-subtitle2 ellipsis">{{ character.location.name }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          color="primary"
          :icon="icons.status.icon"
          :class="icons.status.color"
        />
        <q-btn
          color="primary"
          :icon="icons.species"
        />
        <q-btn
          color="primary"
          :icon="icons.gender"
        >
      </q-btn>
      </q-card-actions>
    </q-card>
</template>

<style lang="scss">
.character-card {
  transition: all .2s ease-out;

    &:hover {
      cursor: pointer;
      filter: saturate(1.3);
      border: 1px solid #DDD;
    }
  }
</style>
