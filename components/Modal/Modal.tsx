import { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        onClose();
      }}
      className="modal-bg h-screen w-screen absolute top-0 left-0 z-20 grid place-items-center"
    >
      {children}
    </div>
  ) : null;

  // prevent rendering on server
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal') as HTMLElement
    );
  }
  return null;
};

export default Modal;
