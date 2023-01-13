import React from 'react';

import styles from './modal-overlay.module.css';

const ModalOverlay = React.memo( ({isModalOpen, onClose}) => {
    return (
        <div
            className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ''}`}
            onClick={onClose}
        >
        </div>
    );
});

export default ModalOverlay;