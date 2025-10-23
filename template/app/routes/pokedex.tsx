function getPokemonName() {
	return "pikachu";
}

export async function loader() {
	const pokemonName = etPokemonName();
	return { pokemonName };
}

export default function ({ pokemonName }) {
	return <div>The pokemon name is {pokemonName}</div>;
}
