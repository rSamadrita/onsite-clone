import "./DeleteProjectModal.css";

const DeleteProjectModal = ({ onCancel, onDelete }) => {
  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          🗑️
        </div>

        <h2>Delete Project?</h2>

        <p>
          This action cannot be undone.
        </p>

        <div className="delete-buttons">

          <button
            className="cancel-delete"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteProjectModal;