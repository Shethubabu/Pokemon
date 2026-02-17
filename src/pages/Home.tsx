import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../api/pokemonApi";
import PokemonCard from "../components/PokemonCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Spinner } from "@/components/ui/spinner";

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
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  const filtered = data?.pages
    .flatMap((page) => page.results)
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

 
  if (isPending)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <Input
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered?.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

     
      <div ref={ref} className="text-center p-6">
        {isFetchingNextPage && <Spinner className="w-6 h-6 mx-auto" />}
      </div>
    </div>
  );
};

export default Home;
