import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = React.memo( ({children, header, onModalClose, isModalOpen}) => {

    useEffect(() => {
        const keyDownHandler = e => {
            if(e.key === 'Escape') {
                onModalClose()
            }
        }

        if (!isModalOpen) return;

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [isModalOpen])

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} p-10 ${isModalOpen ? styles.active : ''}`}>
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
            <ModalOverlay isModalOpen={isModalOpen} onClose={onModalClose} />
        </>,
        document.getElementById('modal')
)});

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
    onModalClose: PropTypes.func,
    isModalOpen: PropTypes.bool
}

export default Modal;