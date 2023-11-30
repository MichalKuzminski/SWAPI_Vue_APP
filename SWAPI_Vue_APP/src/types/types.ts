export interface IUser {
  name: string;
  height: number;
  mass: number;
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
