import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

interface Props {
  name: string;
}

const PokemonCard = ({ name }: Props) => {
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
            src={`https://img.pokemondb.net/artwork/${name}.jpg`}
            alt={name}
            className="w-full h-40 object-contain"
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;
