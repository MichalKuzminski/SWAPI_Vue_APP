import axios from 'axios';

const getUsersList = async () => {
  try {
    const users = await axios.get('https://swapi.dev/api/people');
    if (!users) return [];
    return users.data;
  } catch (err) {
    console.error(err);
  }
};
const getPlanetById = async (url: string) => {
  try {
    const planet = await axios.get(url);
    if (!planet) return null;
    return planet.data;
  } catch (err) {
    console.error(err);
  }
};

export { getUsersList, getPlanetById };
