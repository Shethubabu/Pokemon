import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async ({ pageParam = 0 }) => {
  const limit = 20;
  const res = await axios.get(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${pageParam}`
  );
  return res.data;
};

export const fetchPokemonDetails = async (name: string) => {
  const res = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return res.data;
};

