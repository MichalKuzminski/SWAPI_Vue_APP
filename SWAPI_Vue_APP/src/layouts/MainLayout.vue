<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="headerStyle">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          ><img src="../assets/title.png" style="height: 70px" />
        </q-toolbar-title>

        <div>author: Michał Kuźmiński</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :content-class="['headerStyle']"
      v-model="leftDrawerOpen"
      dark
      show-if-above
    >
      <q-card
        v-for="(el, idx) in additionalInfo"
        :key="el"
        dark
        bordered
        class="bg-grey-9 q-my-md"
      >
        <q-card-section>
          <div class="text-subtitle2">Tip {{ idx + 1 }}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          {{ el }}
        </q-card-section>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const additionalInfo = ref<string[]>([
      'Use a searchbar to filter table by name',
      'Click on Planet Name to display its data (you will notice cursor pointer)',
      'Click column name to sort it',
      'Click hamburger icon to hide/show these tips',
    ]);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      additionalInfo,
    };
  },
});
</script>
<style scoped>
.headerStyle {
  background-color: black;
  border-bottom: 2px yellow solid;
}
.drawerStyle {
  background-image: url('../assets/space.jpg') !important;
  background-size: cover;
}
</style>
