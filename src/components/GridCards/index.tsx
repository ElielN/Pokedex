import {PokeCard} from '../PokeCard';

import './styles.scss';

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
                    key={pokemons.name}
                    url={pokemons.url}
                    pokemonName={pokemons.name}
                />
            ))}
        </div>
    );
}