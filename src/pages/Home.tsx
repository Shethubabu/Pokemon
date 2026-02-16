import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../api/pokemonApi";
import PokemonCard from "../components/PokemonCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const offset = url.searchParams.get("offset");
      return offset ? Number(offset) : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const filtered = data?.pages
    .flatMap((page) => page.results)
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

  if (isPending) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="w-full p-3 mb-6 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered?.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      <div ref={ref} className="text-center p-6">
        {isFetchingNextPage && "Loading more..."}
      </div>
    </div>
  );
};

export default Home;
