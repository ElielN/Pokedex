import { useEffect, useState } from 'react';
import { colorsMap } from '../PokeCard/colorsMap';
import { motion } from 'framer-motion';
import './styles.scss';

type attributesType = {
    colors: Array<string>,
    value: number
};

const barMotion = {
    hidden: { x: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};   


export function AttributeBar({att}: {[key: string | number]: number | string | any }) {
   
   const [hp, setHp] = useState(0);
   const [attack, setAttack] = useState(0);
   const [defense, setDefense] = useState(0);
   const [spAttack, setSpAttack] = useState(0);
   const [spDefense, setSpDefense] = useState(0);
   const [speed, setSpeed] = useState(0);

   /* useEffect(() => {
        console.log(att)
   }) */

    useEffect(() => {
        const newHp = (280/190) * att.stats.hp;
        const newAtk = (280/181) * att.stats.attack;
        const newDef = (280/230) * att.stats.defense;
        const newSpAtk = (280/180) * att.stats.special_attack;
        const newSpDef = (280/230) * att.stats.special_defense;

        /* console.log(att.typeOne)
        console.log(att.typeTwo) */

        setSpDefense(newSpDef);
        setSpAttack(newSpAtk);
        setDefense(newDef);
        setAttack(newAtk);
        setHp(newHp);
    },[att])

    return (
        <div className='att-content'>
            <p>HP: {att.stats.hp}</p>
            <div className="entire-bar">
                <div 
                className="value-bar" 
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${hp}px`}} 
                />
            </div>

            <p>Attack: {att.stats.attack}</p>
            <div className="entire-bar">
                <div 
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${attack}px`}}
                />
            </div>

            <p>Defense: {att.stats.defense}</p>
            <div className="entire-bar">
                <div 
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${defense}px`}}
                />
            </div>

            <p>Special Attack: {att.stats.special_attack}</p>
            <div className="entire-bar">
                <div
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${spAttack}px`}}
                />
            </div>

            <p>Special Defense: {att.stats.special_defense}</p>
            <div className="entire-bar">
                <div
                className="value-bar" 
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${spDefense}px`}}
                />
            </div>
        </div>
    );
}

