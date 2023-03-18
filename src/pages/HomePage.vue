<script setup lang="ts">
import { ref, onMounted } from 'vue';

const image = ref('https://res.cloudinary.com/dgmcox/image/upload/q_10/v1677940843/a11y-training/Rick-And-Morty-ts_sxr46n.webp');

onMounted(() => {
  setTimeout(() => {
    image.value = 'https://res.cloudinary.com/dgmcox/image/upload/v1677940843/a11y-training/Rick-And-Morty-ts_sxr46n.webp';
  });
});

</script>

<template>
  <q-page class="flex flex-center">
    <div class="home__container">
      <q-img
        class="home__image"
        ratio="1"
        :src="image"
        spinner-color="primary"
      />
    </div>
  </q-page>
</template>
<style lang="scss">
.home {
  &__image {
    width: 60vh;
    height: auto;
    animation: grow-shrink 6s linear infinite;
  }
}

@keyframes grow-shrink {
  0% {
    transform: scale(100%) rotate(-5deg);
  }

  50% {
    transform: scale(110%) rotate(5deg);
  }

  100% {
    transform: scale(100%) rotate(-5deg);
  }
}
</style>
