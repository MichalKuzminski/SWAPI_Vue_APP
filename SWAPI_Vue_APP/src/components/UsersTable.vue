<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Users"
      :rows="rows"
      :columns="columns"
      no-data-label="Loading..."
      row-key="name"
    >
      <template v-slot:body-cell-planet="props">
        <!-- Sprawdź, czy obecny wiersz to ostatni wiersz -->
        <q-td
          :props="props"
          style="cursor: pointer"
          @click="showPlanetData(props.row.planetInfo)"
        >
          {{ props.row.planet }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useUsersStore } from 'src/stores/users-store';
import { IUser, IPlanet } from 'src/types/types';
import { getPlanetById } from 'src/api/swapi';
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
  setup() {
    const usersStore = useUsersStore();
    const rows = ref<IUser[]>([]);
    onMounted(async () => {
      await usersStore.getAllUsers();
      const users = usersStore.getUsers;
      const combined = await combinedData(users);
      console.error('combined: ', combined);
      rows.value = await parseRows(combined);
    });

    const showPlanetData = (planetInfo: IPlanet) => {
      console.error('aaa: ', planetInfo);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseRows = async (rows: any): Promise<IUser[]> => {
      let usersArray: IUser[] = [];
      if (rows.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows.forEach((row: any) => {
          usersArray.push({
            name: row.name,
            height: row.height,
            mass: row.mass,
            created: row.created.split('T')[0],
            edited: row.edited.split('T')[0],
            planet: row.planetInfo.name,
            planetInfo: row.planetInfo,
          });
        });
      }
      return usersArray;
    };

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
    return { columns, rows, showPlanetData };
  },
});
</script>
