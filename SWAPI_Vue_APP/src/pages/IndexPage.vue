<template>
  <q-page class="row items-start justify-evenly">
    <users-table />
  </q-page>
</template>

<script lang="ts">
import UsersTable from '../components/UsersTable.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { UsersTable },
  setup() {
    return {};
  },
});
</script>
