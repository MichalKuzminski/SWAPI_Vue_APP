<template>
  <q-page class="mainPage row items-start justify-evenly">
    <users-table />
  </q-page>
</template>

<script lang="ts">
import UsersTable from '../components/UsersTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UsersTable },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.mainPage {
  background-image: url('../assets/space.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
