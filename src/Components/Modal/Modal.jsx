import "./Modal.css"
import { createPortal } from "react-dom";


export function Modal({ isOpen, children }) {
    if (!isOpen) return null;
    return createPortal( 
    <div className="modal-wpapper">
    <div className="modal">
      {children}
    </div>
  </div>,

  document.getElementById("modal") );
}

