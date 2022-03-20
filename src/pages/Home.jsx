import { useCallback, useEffect, useState } from 'react';
import { GridCards } from '../components/GridCards';
import { loadPokemon } from '../utils/load-pokemons';

import pokeball from '../assets/images/pokeball-icon.svg';
import pokemonLogo from '../assets/images/pokemon-logo.svg';

import '../styles/home.scss';

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
            <div className='image-background'>
                <img src={pokeball} alt='pokeball'/>
            </div>
            <div className='image-logo'>
                <img src={pokemonLogo} alt='pokemon logo'/>
            </div>
            <GridCards pokemons={pokemonsArray} />
        </div>
    );
}