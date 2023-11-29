<template>
  <q-dialog v-model="isOpenComputed" persistent>
    <q-card class="my-card" style="width: 500px; height: 800px">
      <img src="../assets/Tatooine.png" />

      <q-card-section>
        <p>Name: {{ planetInfo?.name }}</p>
        <p>Diameter: {{ planetInfo?.diameter }}</p>
        <p>Climate: {{ planetInfo?.climate }}</p>
        <p>Population: {{ planetInfo?.population }}</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn label="close" @click="closeDialog"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IPlanet } from 'src/types/types';
import Alderaan from '../assets/Alderaan.png';
import Naboo from '../assets/Naboo.png';
import Tatooine from '../assets/Tatooine.png';
import Stewjon from '../assets/Stewjon.png';

export default defineComponent({
  name: 'PlanetDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    planetInfo: {
      type: Object as PropType<IPlanet>,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isOpenComputed = ref(props.isOpen);

    const closeDialog = () => {
      isOpenComputed.value = false;
      emit('close');
    };
    return {
      isOpenComputed,
      closeDialog,
    };
  },
});
</script>
