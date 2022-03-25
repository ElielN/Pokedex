import { GridCards } from '../components/GridCards';
import { loadPokemon } from '../utils/load-pokemons';
import { motion } from "framer-motion";
import { ModalContext } from '../context/ModalContext';
import { Modal } from '../components/ModalPokemon';
import { useCallback, useContext, useEffect, useState } from 'react';

import pokeball from '../assets/images/pokeball-icon.svg';
import pokemonLogo from '../assets/images/pokemon-logo.svg';
import soundIcon from '../assets/images/sound-icon.png';
import noSoundIcon from '../assets/images/no-sound-icon.png';

import '../styles/home.scss';

import ReactPlayer from 'react-player/youtube'

export function Home() {

    const { modalValues } = useContext(ModalContext);
    const [modalUp, setModalUp] = useState(false);

    const [pokemonsOffset, setPokemonsOffset] = useState(20);
    const [pokemonsArray, setPokemonsArray] = useState<[] | any>([]);

    const [play, setPlay] = useState(false);

    const handleLoadPosts = useCallback(async () => {
        
        const pokemons = await loadPokemon();

        setPokemonsArray(pokemons);

    }, []);

    useEffect(() => {
        if(modalValues!['id'] !== -1) {
            setModalUp(true);
        } else {
            setModalUp(false);
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
        <>
            <ReactPlayer url='https://www.youtube.com/watch?v=80863f0C2t0'
            playing={play}
            volume={0.1}
            style={{display: 'none'}}
            />
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
                <div className='floating-sound-button' onClick={() => setPlay(play ? false : true)}>
                    {play ? 
                    (<img src={soundIcon} alt='sound icon'/>) 
                    : 
                    (<img src={noSoundIcon} alt='no sound icon'/>)}
                </div>
            </div>
        </>
    );
}