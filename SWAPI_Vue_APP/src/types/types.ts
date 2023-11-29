export interface IUser {
  name: string;
  height: string;
  mass: string;
  created: string;
  edited: string;
  planet: string;
  planetInfo?: IPlanet;
}

export interface IPlanet {
  name: string;
  diameter: string;
  climate: string;
  population: string;
}
