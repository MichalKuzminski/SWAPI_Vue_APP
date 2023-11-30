<template>
  <div class="q-pa-md">
    <div style="border: 2px white solid" class="content-center" v-if="loading">
      <img src="../assets/waiting.gif" style="text-align: center" />
      <p style="color: yellow" class="text-h4 text-center">
        Retrieving data from API, please wait...
      </p>
    </div>
    <div v-else>
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        dark
        title="Users"
        :rows="searchedName.length ? filteredRows : rows"
        :columns="columns"
        no-data-label="No data :("
        row-key="name"
      >
        <template v-slot:body-cell-planet="props">
          <q-td
            :props="props"
            style="cursor: pointer"
            @click="showPlanetData(props.row.planetInfo)"
          >
            {{ props.row.planet }}
          </q-td>
        </template>
      </q-table>
      <q-input
        class="q-mt-lg"
        style="border: 1px yellow dotted"
        dark
        dense
        placeholder="Search by name"
        v-model="searchedName"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <planet-dialog
        v-if="planetDialogVisible"
        :isOpen="planetDialogVisible"
        :planetInfo="currentPlanetData"
        @close="closeDialog"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUsersStore } from 'src/stores/users-store';
import { IUser, IPlanet } from 'src/types/types';
import { getPlanetById } from 'src/api/swapi';
import PlanetDialog from './PlanetDialog.vue';
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'height',
    align: 'center',
    label: 'Height',
    field: 'height',
    sortable: true,
  },
  { name: 'mass', label: 'Mass', field: 'mass', sortable: true },
  { name: 'created', label: 'Created', field: 'created', sortable: true },
  { name: 'edited', label: 'Edited', field: 'edited', sortable: true },
  { name: 'planet', label: 'Planet Name', field: 'planet', sortable: true },
];

export default defineComponent({
  name: 'UsersTable',
  props: {},
  components: {
    PlanetDialog,
  },
  setup() {
    const loading = ref<boolean>(false);
    const planetDialogVisible = ref(false);
    const usersStore = useUsersStore();
    const rows = ref<IUser[]>([]);
    const currentPlanetData = ref<IPlanet>({} as IPlanet);
    const searchedName = ref<string>('');

    onMounted(async () => {
      loading.value = true;
      await usersStore.getAllUsers();
      const users = usersStore.getUsers;
      const combined = await combinedData(users);
      rows.value = await parseRows(combined);
      loading.value = false;
    });

    const showPlanetData = (planetInfo: IPlanet) => {
      planetDialogVisible.value = true;
      currentPlanetData.value = planetInfo;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseRows = async (rows: any): Promise<IUser[]> => {
      let usersArray: IUser[] = [];
      if (rows.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows.forEach((row: any) => {
          usersArray.push({
            name: row.name,
            height: +row.height,
            mass: +row.mass,
            created: row.created.split('T')[0],
            edited: row.edited.split('T')[0],
            planet: row.planetInfo.name,
            planetInfo: row.planetInfo,
          });
        });
      }
      return usersArray;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const combinedData = async (rows: any) => {
      const combined: IUser[] = [];
      for (const row of rows) {
        combined.push({
          ...row,
          planetInfo: await getPlanetData(row.homeworld),
        });
      }
      return combined;
    };
    const getPlanetData = async (url: string): Promise<IPlanet> => {
      const planet = await getPlanetById(url);
      return {
        name: planet.name,
        diameter: planet.diameter,
        climate: planet.climate,
        population: planet.population,
      };
    };

    const closeDialog = () => {
      planetDialogVisible.value = false;
      currentPlanetData.value = {} as IPlanet;
    };

    const filteredRows = computed(() => {
      const searchName = searchedName.value.toLowerCase();
      const filtered = rows.value.filter((row: IUser) =>
        row.name.toLowerCase().includes(searchName)
      );
      return filtered;
    });

    return {
      loading,
      columns,
      rows,
      showPlanetData,
      planetDialogVisible,
      closeDialog,
      currentPlanetData,
      searchedName,
      filteredRows,
    };
  },
});
</script>
