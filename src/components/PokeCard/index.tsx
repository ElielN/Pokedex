import { useContext, useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { PokemonType } from '../PokemonType'

import { colorsMap } from './colorsMap';
import { ModalContext } from "../../context/ModalContext";

import './styles.scss';

type pokeCardType = {
    pokemonName: string,
    url: string
};

const modalValuesDefault = {
    id: -1,
    name: '',
    sprite: '',
    typeOne: '',
    typeTwo: '',
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0
    },
    weight: 0,
    height: 0
};

export function PokeCard({pokemonName, url}: pokeCardType) {

    const { modalValues, setModalValues } = useContext(ModalContext);

    const [pokemonId, setPokemonId] = useState(0);
    const [name, setName] = useState(pokemonName);
    const [sprite, setSprite] = useState('');
    const [pokemonType, setPokemonType] = useState<string[]>();
    const [fetchLoading, setFetchLoading] = useState(true);
    const typesArrayColors: string[] = [];

    const colorA = useRef('#fff');
    const colorB = useRef('#fff');

    const modalValuesRef = useRef({});

    function handleUpdateModalValues(data: {[key: string | number]: any }) {
        let newValues = {
            id: data['id'],
            name: data['name'],
            sprite: data['sprites']['front_default'],
            typeOne: data['types'][0]['type']['name'],
            typeTwo: null,
            stats: {
                hp: data['stats'][0]['base_stat'],
                attack: data['stats'][1]['base_stat'],
                defense: data['stats'][2]['base_stat'],
                special_attack: data['stats'][3]['base_stat'],
                special_defense: data['stats'][4]['base_stat'],
                speed: data['stats'][5]['base_stat']
            },
            weight: data['weight'],
            height: data['height']
        }
        try {
            if(typeof data['types'][1]['type']['name'] !== 'undefined') {
                newValues['typeTwo'] = data['types'][1]['type']['name'];
            }
        } catch(e) {
            newValues['typeTwo'] = data['types'][0]['type']['name'];
        }

        modalValuesRef.current = newValues;
    }

    function handleRaiseModalValues() {
        if(modalValues!['id'] !== -1) {
            setModalValues(modalValuesDefault);
            setTimeout(() => {setModalValues(modalValuesRef.current)}, 50);
        } else {
            setModalValues(modalValuesRef.current)
        }
    }

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

            handleUpdateModalValues(dataJson);

            colorA.current = colorsMap[typesArrayColors[0]].toString();
            colorB.current = colorsMap[typesArrayColors[1]].toString();
            
            setPokemonType(typesArray)
            setFetchLoading(false);
        };
        fetchPokemonData(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);


    return (
        <motion.div 
        className="poke-card"
        style={{background: `linear-gradient(${colorA.current}, ${colorB.current})`}}
        whileHover={{scale: 1.1, transition: {duration: 0.5}}}
        onClick={handleRaiseModalValues}
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