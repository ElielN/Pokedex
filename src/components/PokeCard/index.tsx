import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

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
        setFetchLoading(true);
        async function fetchPokemonData(url: string) {
            const pokemonDataFetch = fetch(url);
            const [data] = await Promise.all([pokemonDataFetch]);
            const dataJson = await data.json();

            setPokemonId(dataJson['id']);
            setName(dataJson['name']);
            setSprite(dataJson['sprites']['front_default']);

            const typesArray: string[] = [];

            for(var element in dataJson['types']) {
                typesArray.push(dataJson['types'][element]['type']['name']);
            }
            setPokemonType(typesArray)

            setFetchLoading(false);
        };
        fetchPokemonData(url)
    }, [url]);


    return (
        <motion.div 
        className="poke-card"
        whileHover={{scale: 1.1, transition: {duration: 0.5}}}
        >
            {fetchLoading ?
            (<h1>Loading data...</h1>) 
            : 
            <>  
                <div className="card-id">
                    <div className="card-id-container">
                        <span>Nº {pokemonId}</span>
                    </div>
                </div>
                <img src={sprite} alt={name}/>
                <div className="card-content-text">
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
        </motion.div>
    );
};