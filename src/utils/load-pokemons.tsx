export async function loadPokemon( offset?: string, limit?: string ) {
    const pokemonsResponse = fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

    const [pokemons] = await Promise.all([pokemonsResponse]);

    const pokemonsJson = await pokemons.json();

    const justPokemons = pokemonsJson['results'].map((pokemon:Object) => {
        return pokemon;
    });

    return justPokemons;
};