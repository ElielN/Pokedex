import { useEffect, useRef, useState } from 'react';
import './styles.scss';

type attributesType = {
    colors: Array<string>,
    value: number
};


export function AttributeBar({att}: {[key: string | number]: number | string | any }) {
   
   const [hp, setHp] = useState(0);
   const [attack, setAttack] = useState(0);
   const [defense, setDefense] = useState(0);
   const [spAttack, setSpAttack] = useState(0);
   const [spDefense, setSpDefense] = useState(0);
   const [speed, setSpeed] = useState(0);

   useEffect(() => {
        console.log(att)
   })

    useEffect(() => {
        const newHp = (280/190) * att.stats.hp;
        const newAtk = (280/181) * att.stats.attack;
        const newDef = (280/200) * att.stats.defense;
        const newSpAtk = (280/180) * att.stats.special_attack;
        const newSpDef = (280/200) * att.stats.special_defense;

        setSpDefense(newSpDef);
        setSpAttack(newSpAtk);
        setDefense(newDef);
        setAttack(newAtk);
        setHp(newHp);
    },[att])

    return (
        <>
            <p>HP: {att.stats.hp}</p>
            <div className="entire-bar">
                <div className="value-bar" style={{background: `linear-gradient(to right, rgba(117, 233, 166, 1.0), rgba(202, 151, 222, 1.0))`, width:`${hp}px`}}>

                </div>
            </div>

            <p>Attack: {att.stats.attack}</p>
            <div className="entire-bar">
                <div className="value-bar" style={{background: `linear-gradient(to right, rgba(117, 233, 166, 1.0), rgba(202, 151, 222, 1.0))`, width:`${attack}px`}}>

                </div>
            </div>

            <p>Defense: {att.stats.defense}</p>
            <div className="entire-bar">
                <div className="value-bar" style={{background: `linear-gradient(to right, rgba(117, 233, 166, 1.0), rgba(202, 151, 222, 1.0))`, width:`${defense}px`}}>

                </div>
            </div>

            <p>Special Attack: {att.stats.special_attack}</p>
            <div className="entire-bar">
                <div className="value-bar" style={{background: `linear-gradient(to right, rgba(117, 233, 166, 1.0), rgba(202, 151, 222, 1.0))`, width:`${spAttack}px`}}>

                </div>
            </div>

            <p>Special Defense: {att.stats.special_defense}</p>
            <div className="entire-bar">
                <div className="value-bar" style={{background: `linear-gradient(to right, rgba(117, 233, 166, 1.0), rgba(202, 151, 222, 1.0))`, width:`${spDefense}px`}}>

                </div>
            </div>
        </>
    );
}

