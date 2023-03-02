import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
   onClose: () => void; 
}

const ModalOverlay: FC<TModalOverlay> = ({onClose}) => {
    return (
        <div
            className={`${styles.modalOverlay}`}
            onClick={onClose}
        >
        </div>
    );
};

export default ModalOverlay;