import { useEffect, useState } from "react";

import { PokemonType } from '../PokemonType'

import './styles.scss';

type pokeCardType = {
    pokemonName: string,
    url: string
};


export function PokeCard({pokemonName, url}: pokeCardType) {
    const [pokemonId, setPokemonId] = useState(0);
    const [name, setName] = useState(pokemonName);
    const [sprite, setSprite] = useState('');
    const [pokemonType, setPokemonType] = useState<string[]>();

    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemonData(url: string) {
            const pokemonDataFetch = fetch(url);
            const [data] = await Promise.all([pokemonDataFetch]);
            const dataJson = await data.json();

            //console.log('dataJson pokeCard: ', dataJson);

            setPokemonId(dataJson['id']);
            setName(dataJson['name']);
            setSprite(dataJson['sprites']['front_default']);

            const typesArray: string[] = [];

            for(var element in dataJson['types']) {
                typesArray.push(dataJson['types'][element]['type']['name']);
            }
            setPokemonType(typesArray)

            console.log(typesArray)

            setFetchLoading(false);
        };
        fetchPokemonData(url)
    }, [url]);


    return (
        <div className="poke-card">
            {fetchLoading ?
            (<h1>Loading data</h1>) 
            : 
            <>
                <img src={sprite} alt='poketest'/>
                <div className="card-content-text">
                    <p>Nº {pokemonId}</p>
                    <h1>{name}</h1>
                    <div className="pokemon-types">
                        {pokemonType?.map(type => (
                            <PokemonType 
                                type={type}
                            /> 
                            
                        ))}
                    </div>
                </div>
            </>
            }
        </div>
    );
};