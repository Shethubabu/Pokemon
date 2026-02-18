import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Props {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url }: Props) => {
  const navigate = useNavigate();
  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div onClick={() => navigate(`/pokemon/${name}`)} className="cursor-pointer">
      <Card className="hover:scale-105 transition">
        <CardHeader>
          <CardTitle className="text-center capitalize text-lg font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={imageUrl} alt={name} className="w-full h-40 object-contain" />
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonCard;
