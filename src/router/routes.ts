const routes = [
  {
    path: '/',
    label: 'Home',
    meta: {
      order: 1,
    },

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue'), name: 'characters' },
    ],
  },
  {
    path: '/characters',
    label: 'Characters',
    meta: {
      order: 2,
      name: 'characters',
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CharactersPage.vue') },
    ],
  },
  {
    path: '/favorites',
    label: 'Favorites',

    meta: {
      order: 3,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FavoritesPage.vue'), name: 'favorites' },
    ],
  },
  {
    path: '/details/:id',
    label: 'Details',
    meta: {
      order: 4,
      hideOnToolbar: true,
      detail: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CharacterDetailPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      order: 3,
      hideOnToolbar: true,
    },
  },
];

export default routes;
