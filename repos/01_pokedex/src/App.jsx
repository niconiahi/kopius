import { useState, useEffect } from "react";

const SELECTED_POKEMONS_COOKIE_NAME = "selected-pokemon-ids";
export default function () {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(() => {
    const prevSelectedPokemonIds = getCookieValue(
      SELECTED_POKEMONS_COOKIE_NAME,
    );
    return prevSelectedPokemonIds ?? [];
  });
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    name: "",
  });

  useEffect(() => {
    async function run() {
      const [pokemons, types] = await Promise.all([
        fetchPokemons(),
        fetchTypes(),
      ]);
      setPokemons(pokemons);
      setTypes(types.results);
    }
    run();
  }, []);

  useEffect(() => {
    const TIME_TO_LIVE = 60;
    setCookie({
      main: [SELECTED_POKEMONS_COOKIE_NAME, JSON.stringify(selectedPokemonIds)],
      attributes: [
        ["max-age", TIME_TO_LIVE],
        ["path", "/"],
      ],
    });
  }, [selectedPokemonIds]);

  const showingPokemons = pokemons
    .filter((pokemon) => {
      if (!filters.type) {
        return true;
      }
      return pokemon.types.some((type) => {
        return type.type.name === filters.type;
      });
    })
    .filter((pokemon) => {
      if (!filters.name) {
        return true;
      }
      return pokemon.name
        .toLocaleLowerCase()
        .startsWith(filters.name.toLocaleLowerCase());
    });
  const selectedPokemons = (pokemons.length > 0 ? selectedPokemonIds : []).map(
    (pokemonId) => {
      return pokemons.find((pokemon) => {
        return pokemon.id === pokemonId;
      });
    },
  );

  return (
    <>
      <header>
        <input
          value={filters.criteria}
          onChange={(event) => {
            const nextName = event.target.value;
            setFilters((prevFilters) => {
              return { ...prevFilters, name: nextName };
            });
          }}
        />
        <select
          value={filters.type}
          onChange={(event) => {
            const nextType = event.target.value;
            setFilters((prevFilters) => {
              return { ...prevFilters, type: nextType };
            });
          }}
        >
          {types.map((type) => {
            const key = `type-${type.name}`;
            return (
              <option key={key} value={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        <main>
          <ul>
            {showingPokemons.map((pokemon) => {
              const id = `pokemon-${pokemon.id}`;
              return (
                <li key={id}>
                  {pokemon.name}
                  <button
                    type="button"
                    disabled={selectedPokemonIds.includes(pokemon.id)}
                    onClick={() => {
                      setSelectedPokemonIds((prevSelectedPokemonIds) => {
                        return [...prevSelectedPokemonIds, pokemon.id];
                      });
                    }}
                  >
                    add
                  </button>
                </li>
              );
            })}
          </ul>
        </main>
        <aside>
          <ul>
            {selectedPokemons.map((pokemon) => {
              const key = `selected-pokemon-${pokemon.id}`;
              return (
                <li key={key}>
                  {pokemon.name}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPokemonIds((prevSelectedPokemonIds) => {
                        const index = prevSelectedPokemonIds.findIndex(
                          (pokemonId) => {
                            return pokemonId === pokemon.id;
                          },
                        );
                        return [
                          ...prevSelectedPokemonIds.slice(0, index),
                          ...prevSelectedPokemonIds.slice(
                            index + 1,
                            prevSelectedPokemonIds.length,
                          ),
                        ];
                      });
                    }}
                  >
                    remove
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
}

async function fetchPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .then(async (pokemons) => {
      const nextPokemons = [];
      await Promise.all(
        pokemons.results.map(async (pokemon) => {
          return fetch(pokemon.url)
            .then((response) => {
              return response.json();
            })
            .then((pokemon) => {
              nextPokemons.push(pokemon);
            });
        }),
      );
      return nextPokemons.sort((px, py) => {
        return px.name.localeCompare(py.name);
      });
    });
}

async function fetchTypes() {
  return fetch("https://pokeapi.co/api/v2/type").then((response) => {
    return response.json();
  });
}

function getCookieValue(cookieName) {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => {
      return cookie.trim();
    })
    .map((cookie) => {
      return cookie.split("=");
    });
  const cookie = cookies.find(([name]) => {
    return name === cookieName;
  });
  if (!cookie) {
    return null;
  }
  const serialized = cookie[1];
  if (serialized.startsWith("[")) {
    return JSON.parse(serialized);
  }
  throw new Error("not handled");
}

function setCookie({ main, attributes }) {
  document.cookie = [main, ...attributes]
    .map((attribute) => {
      const [name, value] = attribute;
      return `${name}=${String(value)}`;
    })
    .join("; ");
}
