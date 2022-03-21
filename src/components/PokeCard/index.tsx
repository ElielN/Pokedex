import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { PokemonType } from '../PokemonType'

import { colorsMap } from './colorsMap';

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
    const typesArrayColors: string[] = [];

    const colorA = useRef('#fff');
    const colorB = useRef('#fff');

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
                typesArrayColors.push(dataJson['types'][element]['type']['name']);
            }

            if(typesArrayColors.length < 2) {
                typesArrayColors.push(dataJson['types'][0]['type']['name']);
            }

            colorA.current = colorsMap[typesArrayColors[0]].toString();
            colorB.current = colorsMap[typesArrayColors[1]].toString();
            
            setPokemonType(typesArray)
            setFetchLoading(false);
        };
        fetchPokemonData(url)
    }, [url]);


    return (
        <motion.div 
        className="poke-card"
        style={{background: `linear-gradient(${colorA.current}, ${colorB.current})`}}
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