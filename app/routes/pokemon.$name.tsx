import { useLoaderData, Link, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

interface PokemonData {
  name: string;
  image: string;
  height: number;
  weight: number;
  ability: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  if (!response.ok) throw new Error("Pokemon not found");

  const pokemon = await response.json();
  return { 
    name: pokemon.name, 
    image: pokemon.sprites.front_default, 
    height: pokemon.height, 
    weight: pokemon.weight, 
    ability: pokemon.abilities[0].ability.name 
  };
};

export default function PokemonDetail() {
  const { name, image, height, weight, ability } = useLoaderData<PokemonData>();

  return (
    <div className="pokemon-detail-card">
      <h1>{name}</h1>
      <div className="card">
        <img src={image} alt={name} />
        <ul>
          <li><strong>Height:</strong> {height}</li>
          <li><strong>Weight:</strong> {weight}</li>
          <li><strong>Ability:</strong> {ability}</li>
        </ul>
        <Link to="/" className="button">Regresar a la lista</Link>
      </div>
    </div>
  );
}
