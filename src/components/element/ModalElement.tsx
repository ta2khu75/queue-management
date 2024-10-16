import React from 'react';
type Props = {
    children: React.JSX.Element
    open: boolean
    handleCancel: () => void
}
const ModalElement = ({ children, open, handleCancel }: Props) => {
    if (!open) return null;
    return (
        <div className="modal-overlay" onClick={handleCancel}>
            {children}
            {/* <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleCancel}>X</button>
                {children}
            </div> */}
        </div>
    );
};

export default ModalElement;
