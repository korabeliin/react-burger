import React from 'react';

import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = React.memo( ({isModalOpen, onClose}) => {
    return (
        <div
            className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ''}`}
            onClick={onClose}
        >
        </div>
    );
});

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    isModalOpen: PropTypes.bool
}

export default ModalOverlay;