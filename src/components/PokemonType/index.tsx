import './styles.scss';

type pokemonType = {
    type: string
}

export function PokemonType ({type} : pokemonType) {

    return (
        <div className={`pokemon-type pokemon-type-${type}`}>
            <p>{type}</p>
        </div>
    );
};