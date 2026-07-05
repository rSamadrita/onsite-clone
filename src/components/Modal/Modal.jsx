import './Modal.css';

const Modal = ({ children, open }) => (open ? <div className="modal">{children}</div> : null);

export default Modal;
