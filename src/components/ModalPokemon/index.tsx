import { useEffect } from "react";


export function Modal({modalValues}: {[key: string | number]: any }) {
    
    useEffect(() => {
        console.log(modalValues)
    });
    
    return (
        <div className="modal-pokemon">
            <div className="modal-sprite">
                <img src={modalValues.sprite} alt={modalValues.name}/>
            </div>
            <div className="modal-attributes">
                <p>{modalValues.stats.hp}</p>
                <p>{modalValues.stats.attack}</p>
                <p>{modalValues.stats.defense}</p>
                <p>{modalValues.stats.special_attack}</p>
                <p>{modalValues.stats.special_defense}</p>
                <p>{modalValues.stats.speed}</p>
            </div>
        </div>
    );
}