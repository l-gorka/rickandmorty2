import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface NumParams {
  [key: string]: number
}

interface Filters {
  species?: string
  name?: string
  page?: number
}

export const useStore = defineStore('store', {
  state: () => ({
    characters: {},
    singleCharacter: {},
    filters: <Filters>{},
    pages: <NumParams>{
      characters: 1,
      favorites: 1,
    },
    scrollTop: <NumParams>{
      characters: 0,
      favorites: 0,
    },
  }),

  getters: {
    getCharacters: (state) => state.characters,
    getFilters: (state) => state.filters,
    getPages: (state) => state.pages,
    getScrollTop: (state) => state.scrollTop,
  },

  actions: {
    async fetchCharacters() {
      try {
        const query = ['?'] as string[];
        query.push(`page=${this.pages.characters}`);

        Object.entries(this.filters).forEach(([key, value], index) => {
          if (value) {
            query.push(`&${key}=${value}${index <= 1 && index < (Object.entries(this.filters).length - 1) ? '&' : ''}`);
          }
        });

        const response = await api.get(`character${query.join('')}`);
        this.characters = response.data;
      } catch (error) {
        this.characters = {
          info: {
            pages: 0,
          },
          results: [],
        };
      }
    },

    async fetchSingleCharacter(id: number) {
      try {
        const response = await api.get(`character/${id}`);

        this.singleCharacter = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    setFilters(filters: Filters) {
      this.filters = filters;
    },

    setPage(route: string, page: number) {
      this.pages[route] = page;
    },

    setScrollTop(route: string, scrollTop: number) {
      this.scrollTop[route] = scrollTop;
    },
  },
});
