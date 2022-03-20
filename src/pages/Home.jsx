import { useCallback, useEffect, useState } from 'react';
import { GridCards } from '../components/GridCards';
import { loadPokemon } from '../utils/load-pokemons';

export function Home() {

    const [pokemonsArray, setPokemonsArray] = useState([]);

    const handleLoadPosts = useCallback(async () => {
        
        const pokemons = await loadPokemon();

        setPokemonsArray(pokemons);

    }, []);

    useEffect(() => {
        handleLoadPosts();
    }, [handleLoadPosts]);

    return (
        <div id='home-page'>
            <GridCards pokemons={pokemonsArray} />
        </div>
    );
}