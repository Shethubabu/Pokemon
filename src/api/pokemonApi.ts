import axios from "axios";
import type { PokemonListResponse, PokemonDetails } from "@/types/type";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<PokemonListResponse> => {
  const limit = 20;
  const res = await axios.get<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${pageParam}`
  );
  return res.data;
};

export const fetchPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  const res = await axios.get<PokemonDetails>(`${BASE_URL}/pokemon/${name}`);
  return res.data;
};
