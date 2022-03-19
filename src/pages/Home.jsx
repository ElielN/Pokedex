import { useEffect } from 'react';
import { loadPokemon } from '../utils/load-pokemons';

export function Home() {

    useEffect(() => {
        const pokemons = loadPokemon();
    });

    return (
        <div id='home-page'>
            <h1>Olá</h1>
        </div>
    );
}