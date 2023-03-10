<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const genderIcon = computed(() => {
  if (props.character.gender === 'Female') {
    return 'female';
  }

  if (props.character.gender === 'Male') {
    return 'male';
  }

  return 'transgender';
});

const statusIcon = computed(() => {
  if (props.character.status === 'Alive') {
    return { icon: 'sentiment_very_satisfied', color: 'text-green' };
  }

  if (props.character.status === 'Dead') {
    return { icon: 'sentiment_very_dissatisfied', color: 'text-red' };
  }

  return { icon: 'help_outline', color: 'text-white' };
});

const speciesIcon = computed(() => {
  if (props.character.species === 'Human') {
    return 'face';
  }
  if (props.character.species === 'Animal') {
    return 'pets';
  }

  return 'person_4';
});

const handleOpenDetails = () => {
  router.push(`details/${props.character.id}`);
};

</script>

<template>
    <q-card class="character-card" square bordered flat>
      <q-img :src="character.image" loading="lazy" @click="handleOpenDetails" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="favorite_border"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          @click="() => {}"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis" @click="handleOpenDetails">
            {{character.name}}
          </div>
        </div>
        <div class="text-subtitle2">{{ character.location.name }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          color="primary"
          :icon="statusIcon.icon"
          :class="statusIcon.color"
        />
        <q-btn
          color="primary"
          :icon="speciesIcon"
        />
        <q-btn
          color="primary"
          :icon="genderIcon"
        >
      </q-btn>
      </q-card-actions>
    </q-card>
</template>

<style lang="scss">
.character-card {
  transition: all .2s ease-out;

    &:hover {
      // transform: scale(1.1);
      cursor: pointer;
      filter: saturate(1.3);
      border: 1px solid #DDD;
      z-index: 5;
    }
  }
</style>
