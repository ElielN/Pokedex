import { useEffect, useState } from 'react';
import { colorsMap } from '../PokeCard/colorsMap';
import './styles.scss';  


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
        const newSpeed = (280/160) * att.stats.speed;

        /* console.log(att.typeOne)
        console.log(att.typeTwo) */

        setSpeed(newSpeed);
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

            <p>Atk: {att.stats.attack}</p>
            <div className="entire-bar">
                <div 
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${attack}px`}}
                />
            </div>

            <p>Def: {att.stats.defense}</p>
            <div className="entire-bar">
                <div 
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${defense}px`}}
                />
            </div>

            <p>Special Atk: {att.stats.special_attack}</p>
            <div className="entire-bar">
                <div
                className="value-bar"
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${spAttack}px`}}
                />
            </div>

            <p>Special Def: {att.stats.special_defense}</p>
            <div className="entire-bar">
                <div
                className="value-bar" 
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${spDefense}px`}}
                />
            </div>

            <p>Speed: {att.stats.speed}</p>
            <div className="entire-bar">
                <div
                className="value-bar" 
                style={{background: `linear-gradient(to right, ${colorsMap[att.typeOne]}, ${colorsMap[att.typeTwo]})`, width:`${speed}px`}}
                />
            </div>
        </div>
    );
}

