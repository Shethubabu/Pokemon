import { Link } from "react-router-dom";

interface Props {
  name: string;
}

const PokemonCard = ({ name }: Props) => {
  return (
    <Link to={`/pokemon/${name}`}>
      <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition">
        <img
          src={`https://img.pokemondb.net/artwork/${name}.jpg`}
          alt={name}
          className="w-full h-40 object-contain"
        />
        <h2 className="text-center capitalize font-bold mt-2">
          {name}
        </h2>
      </div>
    </Link>
  );
};

export default PokemonCard;
