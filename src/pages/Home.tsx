import { GridCards } from '../components/GridCards';
import { loadPokemon } from '../utils/load-pokemons';
import { motion } from "framer-motion";

import pokeball from '../assets/images/pokeball-icon.svg';
import pokemonLogo from '../assets/images/pokemon-logo.svg';

import '../styles/home.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { Modal } from '../components/ModalPokemon';

export function Home() {

    const { modalValues, setModalValues } = useContext(ModalContext);
    const [modalUp, setModalUp] = useState(false);

    const [pokemonsOffset, setPokemonsOffset] = useState(20);
    const [pokemonsArray, setPokemonsArray] = useState<[] | any>([]);

    const handleLoadPosts = useCallback(async () => {
        
        const pokemons = await loadPokemon();

        setPokemonsArray(pokemons);

    }, []);

    useEffect(() => {
        if(modalValues!['id'] !== -1) {
            setModalUp(true);
            //console.log(modalValues);
        }
    }, [modalValues]);

    useEffect(() => {
        handleLoadPosts();
    }, [handleLoadPosts]);

    function updateOffset(): Boolean {
        const oldOffset = pokemonsOffset
        const newPokemonsNumber = pokemonsOffset + 20;
        setPokemonsOffset(newPokemonsNumber);
        if(oldOffset < newPokemonsNumber) {
            return true
        }
        return false;
    }

    async function handleLoadMorePokemons() {
        if(updateOffset()) {
            const limit = '20';
            await loadPokemon(pokemonsOffset.toString(), limit)
            .then(newPokemons => setPokemonsArray([...pokemonsArray, ...newPokemons]));
        }
    };


    return (
        <div id='home-page'>
            <div className='image-background'>
                <img src={pokeball} alt='pokeball'/>
            </div>
            <div className='image-logo'>
                <img src={pokemonLogo} alt='pokemon logo'/>
            </div>
            <GridCards pokemons={pokemonsArray} />
            <div className='pokeball-button-container'>
                <motion.div 
                whileHover=
                {{rotate: 360,
                transition: {duration: 0.5}
                }}
                
                className='pokeball-button'
                onClick={() => handleLoadMorePokemons()}
                >
                    <img src={pokeball} alt='pokeball button'/>
                </motion.div>
            </div>
            {modalUp && (
                <Modal modalValues={modalValues} />
            )}
        </div>
    );
}