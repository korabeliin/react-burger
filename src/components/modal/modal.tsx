import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: HTMLElement | null = document.getElementById('modal');

type TModal = {
    header?: string;
    onModalClose: () => void;
    children: React.ReactNode;
}

const Modal: FC <TModal> = ({children, header, onModalClose}) => {

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                onModalClose()
            }
        }

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [onModalClose])

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} p-10`}>
                <header>
                    <button onClick={onModalClose}>
                        <CloseIcon type="primary" />
                    </button>
                    {header ?
                        <h3 className="text text_type_main-large">{header}</h3>
                        :
                        null
                    }
                </header>
                {children}
            </div>
            <ModalOverlay onClose={onModalClose} />
        </>, 
        modalRoot!
)};

export default Modal;