import { createContext, ReactNode, useState } from "react";

type ModalValuesType = {
    id: number,
    name: string,
    sprite: string,
    type: string[],
    stats: {
        hp: number,
        attack: number,
        defense: number,
        special_attack: number,
        special_defense: number,
        speed: number
    },
    weight: number,
    height: number
}

const modalValuesDefault = {
    id: 0,
    name: '',
    sprite: '',
    type: ['noType', 'noType'],
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

type ModalContextProviderProps = {
    children: ReactNode,
};

type  ModalContextType = {
    modalValues: ModalValuesType | undefined,
    setModalValues: Function
}

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider(props: ModalContextProviderProps) {

    const [modalValues, setModalValues] = useState<ModalValuesType>(modalValuesDefault);

    return (
        <ModalContext.Provider value={{modalValues, setModalValues}}>
            {props.children}
        </ModalContext.Provider>
    );
};
/* export function aa() {
    return (<h1>aa</h1>)
} */