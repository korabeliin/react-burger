import React, {useCallback, useState} from 'react';

const withModal = Component => props => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = useCallback( () => {
        setIsModalOpen(false);
    }, [])

    const handleModalOpen = useCallback(  () => {
        setIsModalOpen(true);
    }, [])

    return (
        <Component
            {...props}
            isModalOpen={isModalOpen}
            onModalClose={handleModalClose}
            onModalOpen={handleModalOpen}
        />
    );
};

export default withModal;