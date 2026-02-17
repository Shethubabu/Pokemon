import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import {fetchPokemonDetails} from "../api/pokemonApi"
import { useEffect, useState } from "react";

interface Props {
  name: string;
}

const PokemonCard = ({ name }: Props) => {

  const [imgUrl, setImgUrl] = useState<string>("");
    useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonDetails(name);
      setImgUrl(data.sprites.other["official-artwork"].front_default);
    };

    loadPokemon();
  }, [name]);
  return (
    <Link to={`/pokemon/${name}`}>
      <Card className="hover:scale-105 transition">
        <CardHeader>
          <CardTitle className="text-center capitalize text-lg font-bold">
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={imgUrl}
            alt={name}
            className="w-full h-40 object-contain"
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;


function setImgUrl(front_default: any) {
  throw new Error("Function not implemented.");
}

