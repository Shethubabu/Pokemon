import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../api/pokemonApi";
import PokemonCard from "../components/PokemonCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { Spinner } from "@/components/ui/spinner";

type SearchForm = {
  search: string;
};

const Home = () => {
  const { ref, inView } = useInView();

  const { control, register } = useForm<SearchForm>({
    defaultValues: { search: "" },
  });

  const searchValue = useWatch({ control, name: "search" });
  const [debouncedSearch] = useDebounce(searchValue ?? "", 300);


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
  }, [inView, hasNextPage, fetchNextPage]);

  
  const filtered = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.results)
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
  }, [data, debouncedSearch]);


  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
    
      <input
        {...register("search")}
        placeholder="Search Pokémon..."
        className="mb-6 w-full border rounded-md p-2"
      />

    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url} // pass URL from list API
          />
        ))}
      </div>

     
      <div ref={ref} className="text-center p-6">
        {isFetchingNextPage && <Spinner className="w-6 h-6 mx-auto" />}
      </div>
    </div>
  );
};

export default Home;
