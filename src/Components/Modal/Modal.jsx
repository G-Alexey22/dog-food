import "./Modal.css";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ isOpen, children }) {
  const openAndCloseModal = {
    from: {
      scale: 0,
      transition: {
        duration: 1,
      },
    },
    to: {
      scale: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 1,
      },
    },
  };
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-wpapper">
          <motion.div
            className="modal"
            variants={openAndCloseModal}
            initial="from"
            animate="to"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    document.getElementById("modal")
  );
}
