import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { AttributeBar } from "../AttributeBar";
import { colorsMap } from "../PokeCard/colorsMap";
import './styles.scss';

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
}

export function Modal({modalValues}: {[key: string | number]: number | string | any }) {
    
    const { setModalValues } = useContext(ModalContext);

    function handleCloseModal() {
        setModalValues(modalValuesDefault);
    }

    return (
        <div className="modal-pokemon">
            <p>{modalValues['name']}</p>
            <div className="modal-sprite" style={{background: `linear-gradient(${colorsMap[modalValues['typeOne']]}, ${colorsMap[modalValues['typeTwo']]})`}}>
                <img src={modalValues.sprite} alt={modalValues.name}/>
            </div>
            <div className="modal-attributes">
              <AttributeBar att={modalValues} />
            </div>
            <div className="close-modal-button">
                <button onClick={handleCloseModal}>
                    Close
                </button>
            </div>
        </div>
    );
}