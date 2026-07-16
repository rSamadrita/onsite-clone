import "./PartyTable.css";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateParty, deleteParty } from "../../../redux/slices/partySlice";

import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdSearch,
  MdPerson,
  MdClose,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdCalendarToday,
  MdBadge,
} from "react-icons/md";

const FILTERS = ["All", "Client", "Staff", "Worker", "Investor", "Material Supplier", "Labour Contractor", "Equipment Supplier"];

// ─── View Sheet ──────────────────────────────────────────────────────────────
const ViewSheet = ({ party, onClose, onEdit }) => (
  <div className="pt-overlay" onClick={onClose}>
    <div className="pt-sheet" onClick={(e) => e.stopPropagation()}>
      <div className="pt-sheet-handle" />

      {/* Avatar + name */}
      <div className="pt-view-hero">
        <div className="pt-view-avatar">
          {party.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 className="pt-view-name">{party.name}</h2>
          <span className="pt-view-type-badge">{party.type}</span>
        </div>
        <button className="pt-sheet-close" onClick={onClose}><MdClose /></button>
      </div>

      {/* Details */}
      <div className="pt-view-details">
        {party.phone && (
          <div className="pt-detail-row">
            <MdPhone className="pt-detail-icon phone" />
            <span>{party.phone}</span>
          </div>
        )}
        {party.email && (
          <div className="pt-detail-row">
            <MdEmail className="pt-detail-icon email" />
            <span>{party.email}</span>
          </div>
        )}
        {party.address && (
          <div className="pt-detail-row">
            <MdLocationOn className="pt-detail-icon location" />
            <span>{party.address}</span>
          </div>
        )}
        {party.fatherName && (
          <div className="pt-detail-row">
            <MdPerson className="pt-detail-icon person" />
            <span>Father: {party.fatherName}</span>
          </div>
        )}
        {party.dateOfJoining && (
          <div className="pt-detail-row">
            <MdCalendarToday className="pt-detail-icon calendar" />
            <span>Joined: {new Date(party.dateOfJoining).toLocaleDateString("en-IN")}</span>
          </div>
        )}
        {party.aadharNumber && (
          <div className="pt-detail-row">
            <MdBadge className="pt-detail-icon badge" />
            <span>Aadhar: {party.aadharNumber}</span>
          </div>
        )}
        {party.panNumber && (
          <div className="pt-detail-row">
            <MdBadge className="pt-detail-icon badge" />
            <span>PAN: {party.panNumber}</span>
          </div>
        )}
        <div className="pt-detail-row">
          <span className="pt-balance-label">Balance</span>
          <span className="pt-balance-val">
            ₹ {Number(party.balance || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button className="pt-edit-btn" onClick={onEdit}>
        ✎ Edit Party
      </button>
    </div>
  </div>
);

// ─── Edit Sheet ───────────────────────────────────────────────────────────────
const PARTY_TYPES = [
  { label: "Client", group: null },
  { label: "Staff", group: null },
  { label: "Worker", group: null },
  { label: "Investor", group: null },
  { label: "Material Supplier", group: "Vendor" },
  { label: "Labour Contractor", group: "Vendor" },
  { label: "Equipment Supplier", group: "Vendor" },
];

const EditSheet = ({ party, onClose, onSave }) => {
  const [form, setForm] = useState({ ...party });

  const change = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="pt-overlay" onClick={onClose}>
      <div className="pt-sheet pt-sheet--tall" onClick={(e) => e.stopPropagation()}>
        <div className="pt-sheet-handle" />
        <div className="pt-sheet-header">
          <h3>Edit Party</h3>
          <button className="pt-sheet-close" onClick={onClose}><MdClose /></button>
        </div>

        <div className="pt-edit-body">
          <label>Party Type</label>
          <select value={form.type} onChange={change("type")} className="pt-input">
            {PARTY_TYPES.filter((t) => !t.group).map((t) => (
              <option key={t.label}>{t.label}</option>
            ))}
            <optgroup label="Vendor">
              {PARTY_TYPES.filter((t) => t.group === "Vendor").map((t) => (
                <option key={t.label}>{t.label}</option>
              ))}
            </optgroup>
          </select>

          <label>Party Name *</label>
          <input className="pt-input" value={form.name} onChange={change("name")} placeholder="Name" />

          <label>Phone *</label>
          <input className="pt-input" value={form.phone} onChange={change("phone")} placeholder="Phone" type="tel" />

          <label>Email</label>
          <input className="pt-input" value={form.email || ""} onChange={change("email")} placeholder="Email" type="email" />

          <label>Father Name</label>
          <input className="pt-input" value={form.fatherName || ""} onChange={change("fatherName")} placeholder="Father Name" />

          <label>Date of Joining</label>
          <input className="pt-input" value={form.dateOfJoining || ""} onChange={change("dateOfJoining")} type="date" />

          <label>Address</label>
          <input className="pt-input" value={form.address || ""} onChange={change("address")} placeholder="Address" />

          <label>Aadhar Number</label>
          <input className="pt-input" value={form.aadharNumber || ""} onChange={change("aadharNumber")} placeholder="Aadhar Number" />

          <label>PAN Number</label>
          <input className="pt-input" value={form.panNumber || ""} onChange={change("panNumber")} placeholder="PAN Number" />
        </div>

        <div className="pt-edit-footer">
          <button className="pt-cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="pt-save-btn"
            onClick={() => {
              if (!form.name.trim()) { alert("Name is required."); return; }
              onSave(form);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirm ───────────────────────────────────────────────────────────
const DeleteConfirm = ({ party, onClose, onConfirm }) => (
  <div className="pt-overlay" onClick={onClose}>
    <div className="pt-sheet pt-sheet--sm" onClick={(e) => e.stopPropagation()}>
      <div className="pt-sheet-handle" />
      <div className="pt-delete-body">
        <div className="pt-delete-icon">🗑️</div>
        <h3>Delete Party?</h3>
        <p>
          Are you sure you want to delete <strong>{party.name}</strong>? This
          action cannot be undone.
        </p>
      </div>
      <div className="pt-edit-footer">
        <button className="pt-cancel-btn" onClick={onClose}>Cancel</button>
        <button className="pt-delete-confirm-btn" onClick={onConfirm}>
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Main PartyTable ──────────────────────────────────────────────────────────
const PartyTable = ({ parties = [] }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [viewParty,   setViewParty]   = useState(null);
  const [editParty,   setEditParty]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      const matchesSearch =
        party.name?.toLowerCase().includes(search.toLowerCase()) ||
        party.phone?.includes(search);
      const matchesFilter = filter === "All" || party.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [parties, search, filter]);

  const handleSaveEdit = (updated) => {
    dispatch(updateParty(updated));
    setEditParty(null);
  };

  const handleDelete = () => {
    dispatch(deleteParty(deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="party-table-wrapper">
      {/* Toolbar */}
      <div className="party-toolbar">
        <div className="search-box">
          <MdSearch />
          <input
            placeholder="Search party..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {FILTERS.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="party-table">
        <div className="table-head">
          <span>Name</span>
          <span>Type</span>
          <span>Phone</span>
          <span>Balance</span>
          <span>Actions</span>
        </div>

        {filteredParties.length === 0 ? (
          <div className="empty-table">
            <MdPerson />
            <h3>No Parties Found</h3>
            <p>Start by adding your first client, vendor or employee.</p>
          </div>
        ) : (
          filteredParties.map((party) => (
            <div className="table-row" key={party.id}>
              <span className="party-name-cell">
                <span className="party-avatar-sm">
                  {party.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="party-name-text">{party.name}</span>
              </span>

              <span data-label="Type">
                <div className="party-chip">{party.type}</div>
              </span>

              <span data-label="Phone">{party.phone}</span>

              <span data-label="Balance">
                ₹ {Number(party.balance || 0).toLocaleString("en-IN")}
              </span>

              <span className="actions">
                <button
                  title="View"
                  onClick={() => setViewParty(party)}
                >
                  <MdVisibility />
                </button>
                <button
                  title="Edit"
                  onClick={() => setEditParty(party)}
                >
                  <MdEdit />
                </button>
                <button
                  className="delete"
                  title="Delete"
                  onClick={() => setDeleteTarget(party)}
                >
                  <MdDelete />
                </button>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {viewParty && (
        <ViewSheet
          party={viewParty}
          onClose={() => setViewParty(null)}
          onEdit={() => {
            setEditParty(viewParty);
            setViewParty(null);
          }}
        />
      )}

      {editParty && (
        <EditSheet
          party={editParty}
          onClose={() => setEditParty(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deleteTarget && (
        <DeleteConfirm
          party={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default PartyTable;
