import "./PartyTab.scss";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addParty } from "../../../redux/slices/partySlice";
import PartyTable from "./PartyTable";
import { MdClose } from "react-icons/md";

const PARTY_TYPES = [
  { label: "Client",             group: null },
  { label: "Staff",              group: null },
  { label: "Worker",             group: null },
  { label: "Investor",           group: null },
  { label: "Material Supplier",  group: "Vendor" },
  { label: "Labour Contractor",  group: "Vendor" },
  { label: "Equipment Supplier", group: "Vendor" },
];

// ─── Quick-add bottom sheet ───────────────────────────────────────────────────
const QuickAddSheet = ({ onClose, projectId, autoId }) => {
  const dispatch = useDispatch();
  const [type, setType]   = useState("Client");
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");

  const save = () => {
    if (!name.trim())  { alert("Party Name is required.");  return; }
    if (!phone.trim()) { alert("Phone Number is required."); return; }
    dispatch(addParty({
      id:           Date.now(),
      projectId:    projectId || null,
      type,
      partyId:      String(autoId),
      name:         name.trim(),
      phone:        "+91 " + phone.trim(),
      email:        "",
      fatherName:   "",
      dateOfJoining:"",
      address:      "",
      aadharNumber: "",
      panNumber:    "",
      balance:      0,
      createdAt:    new Date().toISOString(),
    }));
    onClose();
  };

  return (
    <div className="qa-overlay" onClick={onClose}>
      <div className="qa-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="qa-handle" />

        <div className="qa-header">
          <h3>Add Party</h3>
          <button className="qa-close" onClick={onClose}><MdClose /></button>
        </div>

        {/* Party type pills */}
        <p className="qa-label">Party Type</p>
        <div className="qa-type-grid">
          {PARTY_TYPES.filter((t) => !t.group).map((t) => (
            <button
              key={t.label}
              className={`qa-type-pill ${type === t.label ? "qa-type-pill--active" : ""}`}
              onClick={() => setType(t.label)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="qa-group-label">Vendor</p>
        <div className="qa-type-grid">
          {PARTY_TYPES.filter((t) => t.group === "Vendor").map((t) => (
            <button
              key={t.label}
              className={`qa-type-pill ${type === t.label ? "qa-type-pill--active" : ""}`}
              onClick={() => setType(t.label)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Name */}
        <p className="qa-label">Party Name *</p>
        <input
          className="qa-input"
          placeholder="e.g. Ramesh Kumar"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        {/* Phone */}
        <p className="qa-label">Phone Number *</p>
        <div className="qa-phone-row">
          <span className="qa-country">🇮🇳 +91</span>
          <input
            className="qa-input qa-phone-input"
            placeholder="9876543210"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="qa-save-btn" onClick={save}>
          Save Party
        </button>
      </div>
    </div>
  );
};

// ─── PartyTab ─────────────────────────────────────────────────────────────────
const PartyTab = ({ projectId }) => {
  const parties = useSelector((state) =>
    state.parties.parties.filter(
      (p) => !p.projectId || p.projectId === projectId
    )
  );
  const autoId = parties.length + 1;

  const [showSheet, setShowSheet] = useState(false);

  return (
    <div className="party-tab">
      <div className="party-tab-toolbar">
        <button
          className="party-tab-add-btn"
          onClick={() => setShowSheet(true)}
        >
          + Add Party
        </button>
      </div>

      <PartyTable parties={parties} />

      {showSheet && (
        <QuickAddSheet
          projectId={projectId}
          autoId={autoId}
          onClose={() => setShowSheet(false)}
        />
      )}
    </div>
  );
};

export default PartyTab;
