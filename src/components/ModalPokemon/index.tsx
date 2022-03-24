import { AttributeBar } from "../AttributeBar";
import './styles.scss';

export function Modal({modalValues}: {[key: string | number]: number | string | any }) {
    return (
        <div className="modal-pokemon">
            <div className="modal-sprite">
                <img src={modalValues.sprite} alt={modalValues.name}/>
            </div>
            <div className="modal-attributes">
              <AttributeBar att={modalValues} />
            </div>
        </div>
    );
}

/* <p>Atk: <AttributeBar /></p>
<p>Def: <AttributeBar /></p>
<p>S. Atk: <AttributeBar /></p>
<p>S. Def: <AttributeBar /></p>
<p>Speed: <AttributeBar /></p> */