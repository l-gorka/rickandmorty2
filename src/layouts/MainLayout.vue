<script setup lang="ts">
import { ref, TransitionProps } from 'vue';

import { RouteLocation, useRouter } from 'vue-router';

import routes from '../router/routes';

type TransitionMode = TransitionProps['mode'];

const currentTab = ref('Home');
const transitionName = ref('slide-right');
const transitionMode = ref<TransitionMode>('out-in');

const routeList = routes.filter((route) => !route.meta?.hideOnToolbar);

const router = useRouter();

router.afterEach((to: RouteLocation, from: RouteLocation) => {
  if (to.meta.detail) {
    if (window.scrollY === 0) {
      transitionName.value = 'slide-down';
      transitionMode.value = 'default';
      return;
    }

    transitionName.value = 'slide-right';
    transitionMode.value = 'out-in';
    return;
  }

  if (from.meta.detail) {
    transitionName.value = 'slide-up';
    transitionMode.value = 'default';
    return;
  }

  transitionMode.value = 'out-in';
  transitionName.value = (to.meta.order as number) > (from.meta.order as number) ? 'slide-right' : 'slide-left';
});

</script>
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
    <q-page-container class="page-container">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" :mode="transitionMode">
          <component :is="Component" />
        </transition>
        </router-view>

    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.page-container {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
}

</style>
