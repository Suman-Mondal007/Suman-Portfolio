import './Modal.css';

const Modal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className={`modal-overlay ${data ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-icon">
          <i className={`fas ${data.iconClass}`}></i>
        </div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Modal;
