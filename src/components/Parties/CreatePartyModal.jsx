import "./CreatePartyModal.scss";

const CreatePartyModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="create-party-modal">
      <div className="create-party-modal__backdrop" onClick={onClose} />
      <div className="create-party-modal__dialog">
        <header>
          <h2>Create New Party</h2>
          <button type="button" onClick={onClose}>&times;</button>
        </header>

        <div className="create-party-modal__body">
          <p>Use this form to add a new party record for the current project.</p>
        </div>

        <footer>
          <button type="button" className="primary" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreatePartyModal;
