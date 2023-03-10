<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar class="">
        <q-toolbar-title class="header__title flex flex-center q-my-lg"> Rick and morty v2 </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-model="currentTab" stretch active-color="accent">
          <q-route-tab v-for="{path, label} in routeList" :key="label" :name="label" :label="label" :to="path" />
        </q-tabs>
    </q-header>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="accent"
      size="10px"
    />
    <q-page-container>
      <router-view v-slot="{ Component }" class="page-container">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
            </transition>
          </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { api } from 'src/boot/axios.js';
import { useRouter } from 'vue-router';
import routes from '../router/routes';

const currentTab = ref('Home');
const transitionName = ref('slide-right');

const routeList = routes.filter((route) => !route.meta?.hideOnToolbar);

const router = useRouter();

router.afterEach((to: any, from: any) => {
  transitionName.value = to.meta.order > from.meta.order ? 'slide-right' : 'slide-left';
});

</script>
<style lang="scss">
.page-container {
  max-width: 1300px;
  margin: 0 auto;
}

.header {
  &__title {
    // color: red !important;
  }
}

</style>
