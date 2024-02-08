import React from "react";

import "./modal.css";

const CustomModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          
        </div>
        <div className="custom-modal-body">{/* {children} */}</div>
        {/* Add footer if needed */}
      </div>
    </div>
  );
};

export default CustomModal;
