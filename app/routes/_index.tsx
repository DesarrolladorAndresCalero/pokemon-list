import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

interface Pokemon {
  name: string;
  url: string;
}

interface LoaderData {
  pokemons: Pokemon[];
  offset: number;
  limit: number;
}

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const limit = 20;

  const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  return { pokemons: data.results, offset, limit };
};

export default function Index() {
  const { pokemons, offset, limit } = useLoaderData<LoaderData>();

  return (
    <div className="pokemon-list">
      <h1>Pokemon List</h1>
      <div className="cards-container">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="card">
            <Link to={`/pokemon/${pokemon.name}`}>
              <h2>{pokemon.name}</h2>
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} // Imágenes de los Pokémon
                alt={pokemon.name}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {offset > 0 && (
          <Link to={`/?offset=${offset - limit}`} className="button">
            Anterior
          </Link>
        )}
        <Link to={`/?offset=${offset + limit}`} className="button">
          Siguiente
        </Link>
      </div>
    </div>
  );
}
