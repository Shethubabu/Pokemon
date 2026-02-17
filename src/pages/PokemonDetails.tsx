import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/pokemonApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-orange-600",
  flying: "bg-sky-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-600",
  ghost: "bg-violet-700",
  steel: "bg-slate-500",
};

const PokemonDetails = () => {
  const { name } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
    enabled: !!name,
  });

  
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/">← Back</Link>
        </Button>

        
        <div className="text-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="w-72 mx-auto drop-shadow-xl"
          />
          <h1 className="text-4xl font-bold capitalize mt-4">{data.name}</h1>

       
          <div className="flex justify-center gap-3 mt-4">
            {data.types.map((t: any) => (
              <Badge
                key={t.type.name}
                className={`${typeColors[t.type.name] || "bg-gray-500"} capitalize`}
              >
                {t.type.name}
              </Badge>
            ))}
          </div>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
          <div>
            <p className="text-gray-500">Height</p>
            <p className="font-bold text-lg">{data.height}</p>
          </div>
          <div>
            <p className="text-gray-500">Weight</p>
            <p className="font-bold text-lg">{data.weight}</p>
          </div>
          <div>
            <p className="text-gray-500">Base Exp</p>
            <p className="font-bold text-lg">{data.base_experience}</p>
          </div>
          <div>
            <p className="text-gray-500">Abilities</p>
            <p className="font-bold text-lg capitalize">
              {data.abilities.map((a: any) => a.ability.name).join(", ")}
            </p>
          </div>
        </div>

        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Base Stats</h2>
          <div className="space-y-4">
            {data.stats.map((stat: PokemonStat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize font-medium">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
               
                <Progress value={Math.min(stat.base_stat, 100)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
