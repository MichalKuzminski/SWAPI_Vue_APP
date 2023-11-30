<template>
  <q-dialog v-model="isOpenComputed" persistent>
    <q-card
      class="q-pa-xs justify-center items-start content-center"
      style="width: 350px; height: 600px; background-color: gray"
    >
      <!-- due to internal packages problem in my PC, I used this 'ugly' solution in order to display planets images  -->
      <img
        v-if="planetInfo?.name == 'Alderaan'"
        src="../assets/Alderaan.png"
        style="width: 350px; height: 300px"
      />
      <img
        v-if="planetInfo?.name == 'Naboo'"
        src="../assets/Naboo.png"
        style="width: 350px; height: 300px"
      />
      <img
        v-if="planetInfo?.name == 'Tatooine'"
        src="../assets/Tatooine.png"
        style="width: 350px; height: 300px"
      />
      <img
        v-if="planetInfo?.name == 'Stewjon'"
        src="../assets/Stewjon.png"
        style="width: 350px; height: 300px"
      />

      <q-card-section>
        <div class="col q-gutter-y-md">
          <div class="">
            <q-badge class="q-mr-xs" color="black"
              ><span style="color: yellow">Name:</span></q-badge
            >
            <b> {{ planetInfo?.name }} </b>
          </div>
          <div class="row">
            <q-badge class="q-mr-xs" color="black"
              ><span style="color: yellow">Diameter:</span></q-badge
            >
            <b> {{ planetInfo?.diameter }} </b>
          </div>
          <div class="row">
            <q-badge class="q-mr-xs" color="black"
              ><span style="color: yellow">Climate:</span></q-badge
            >
            <b> {{ planetInfo?.climate }} </b>
          </div>
          <div class="row">
            <q-badge class="q-mr-xs" color="black"
              ><span style="color: yellow">Population:</span></q-badge
            >
            <b> {{ planetInfo?.population }}</b>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none justify-center">
        <q-btn
          color="black"
          text-color="yellow"
          style="border-radius: 15px"
          class="full-width q-mt-xl"
          label="close"
          @click="closeDialog"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IPlanet } from 'src/types/types';

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
