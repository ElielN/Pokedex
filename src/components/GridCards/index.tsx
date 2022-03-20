import {PokeCard} from '../PokeCard';

type pokemonType = {
    name: string,
    url: string
}
type gridCardsType = {
    pokemons: pokemonType[],
}

export function GridCards({pokemons = []}: gridCardsType) {
    return (
        <div className='grid-cards'>
            {pokemons.map(pokemons => (
                <PokeCard 
                    key={0}
                    url={pokemons.url}
                    pokemonName={pokemons.name}
                />
            ))}
        </div>
    );
}