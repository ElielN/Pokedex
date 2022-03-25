import { AttributeBar } from "../AttributeBar";
import { colorsMap } from "../PokeCard/colorsMap";
import './styles.scss';

export function Modal({modalValues}: {[key: string | number]: number | string | any }) {
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
                <button>
                    Close
                </button>
            </div>
        </div>
    );
}