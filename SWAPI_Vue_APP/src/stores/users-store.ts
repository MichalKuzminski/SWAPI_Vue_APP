import { defineStore } from 'pinia';
import { getUsersList } from 'src/api/swapi';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async getAllUsers() {
      const users = await getUsersList();
      this.users = users.results;
    },
  },
});
