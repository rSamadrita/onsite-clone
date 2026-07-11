import "./CreatePartyModal.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParty } from "../../../redux/slices/partySlice";

const PARTY_TYPES = [
  { label: "Client",             group: null },
  { label: "Staff",              group: null },
  { label: "Worker",             group: null },
  { label: "Investor",           group: null },
  { label: "Material Supplier",  group: "Vendor" },
  { label: "Labour Contractor",  group: "Vendor" },
  { label: "Equipment Supplier", group: "Vendor" },
];

const TypeBottomSheet = ({ selected, onSelect, onClose }) => (
  <div className="cpm-overlay" onClick={onClose}>
    <div className="cpm-sheet" onClick={(e) => e.stopPropagation()}>
      <div className="cpm-handle" />
      <p className="cpm-sheet-title">Party Type</p>

      {/* Non-vendor types */}
      {PARTY_TYPES.filter((t) => !t.group).map((t) => (
        <div
          key={t.label}
          className={`cpm-type-row ${selected === t.label ? "cpm-type-row--selected" : ""}`}
          onClick={() => { onSelect(t.label); onClose(); }}
        >
          <span>{t.label}</span>
          <span className="cpm-radio">
            {selected === t.label ? "🔵" : "⚪"}
          </span>
        </div>
      ))}

      {/* Vendor group */}
      <p className="cpm-group-label">Vendor</p>
      {PARTY_TYPES.filter((t) => t.group === "Vendor").map((t) => (
        <div
          key={t.label}
          className={`cpm-type-row ${selected === t.label ? "cpm-type-row--selected" : ""}`}
          onClick={() => { onSelect(t.label); onClose(); }}
        >
          <span>{t.label}</span>
          <span className="cpm-radio">
            {selected === t.label ? "🔵" : "⚪"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const CreatePartyModal = ({ onClose, projectId }) => {
  const dispatch = useDispatch();

  // Auto-generate party ID from existing parties count
  const partiesCount = useSelector((state) => state.parties.parties.length);
  const autoId = partiesCount + 1;

  const [typeSheetOpen, setTypeSheetOpen] = useState(false);
  const [form, setForm] = useState({
    type:        "Staff",
    partyId:     String(autoId),
    name:        "",
    phone:       "",
    countryCode: "+91",
    email:       "",
    fatherName:  "",
    dateOfJoining: "",
    address:     "",
    aadharNumber: "",
    panNumber:   "",
  });

  const [aadharFile, setAadharFile]   = useState(null);
  const [panFile,    setPanFile]      = useState(null);

  const change = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const save = () => {
    if (!form.name.trim()) {
      alert("Party Name is required.");
      return;
    }
    if (!form.phone.trim()) {
      alert("Phone Number is required.");
      return;
    }
    dispatch(
      addParty({
        id: Date.now(),
        projectId: projectId || null,
        type:         form.type,
        partyId:      form.partyId,
        name:         form.name.trim(),
        phone:        `${form.countryCode} ${form.phone.trim()}`,
        email:        form.email.trim(),
        fatherName:   form.fatherName.trim(),
        dateOfJoining: form.dateOfJoining,
        address:      form.address.trim(),
        aadharNumber: form.aadharNumber.trim(),
        panNumber:    form.panNumber.trim(),
        balance:      0,
        createdAt:    new Date().toISOString(),
      })
    );
    onClose();
  };

  return (
    <>
      <div className="cpm-overlay" onClick={onClose}>
        <div
          className="cpm-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cpm-header">
            <button className="cpm-back-btn" onClick={onClose}>←</button>
            <h2>Create New Party</h2>
          </div>

          <div className="cpm-body">
            {/* Row: Party Type + Party Id */}
            <div className="cpm-row-2">
              <div className="cpm-field">
                <label>Party Type</label>
                <button
                  className="cpm-select-btn"
                  onClick={() => setTypeSheetOpen(true)}
                >
                  <span>{form.type}</span>
                  <span className="cpm-chevron">⌄</span>
                </button>
              </div>
              <div className="cpm-field">
                <label>Party Id</label>
                <div className="cpm-id-row">
                  <input
                    value={form.partyId}
                    onChange={change("partyId")}
                    className="cpm-input"
                  />
                  <button className="cpm-edit-icon">✎</button>
                </div>
              </div>
            </div>

            {/* Party Name */}
            <div className="cpm-field">
              <input
                className="cpm-input"
                placeholder="Party Name"
                value={form.name}
                onChange={change("name")}
              />
            </div>

            {/* Phone with country code */}
            <div className="cpm-phone-row">
              <button
                className="cpm-country-btn"
                onClick={() => {/* extend later */}}
              >
                🇮🇳 {form.countryCode} ⌄
              </button>
              <input
                className="cpm-input cpm-phone-input"
                placeholder="Phone Number *"
                type="tel"
                value={form.phone}
                onChange={change("phone")}
              />
            </div>

            {/* Email */}
            <div className="cpm-field">
              <input
                className="cpm-input"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={change("email")}
              />
            </div>

            {/* Father Name */}
            <div className="cpm-field">
              <input
                className="cpm-input"
                placeholder="Father Name"
                value={form.fatherName}
                onChange={change("fatherName")}
              />
            </div>

            {/* Date of Joining */}
            <div className="cpm-field cpm-field--icon">
              <input
                className="cpm-input"
                placeholder="Date of Joining"
                type="date"
                value={form.dateOfJoining}
                onChange={change("dateOfJoining")}
              />
              <span className="cpm-input-icon">📅</span>
            </div>

            {/* Address */}
            <div className="cpm-field">
              <input
                className="cpm-input"
                placeholder="Address"
                value={form.address}
                onChange={change("address")}
              />
            </div>

            {/* Additional Fields heading */}
            <p className="cpm-section-label">Additional Fields</p>

            {/* Aadhar Number */}
            <div className="cpm-upload-row">
              <input
                className="cpm-input cpm-upload-input"
                placeholder="Aadhar Number"
                value={form.aadharNumber}
                onChange={change("aadharNumber")}
              />
              <label className="cpm-upload-box">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => setAadharFile(e.target.files[0])}
                />
                <span className="cpm-upload-icon">⬆</span>
                <span className="cpm-upload-label">
                  {aadharFile ? aadharFile.name.slice(0, 8) + "…" : "Upload"}
                </span>
              </label>
            </div>

            {/* PAN Number */}
            <div className="cpm-upload-row">
              <input
                className="cpm-input cpm-upload-input"
                placeholder="PAN Number"
                value={form.panNumber}
                onChange={change("panNumber")}
              />
              <label className="cpm-upload-box">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => setPanFile(e.target.files[0])}
                />
                <span className="cpm-upload-icon">⬆</span>
                <span className="cpm-upload-label">
                  {panFile ? panFile.name.slice(0, 8) + "…" : "Upload"}
                </span>
              </label>
            </div>
          </div>

          {/* Save button */}
          <div className="cpm-footer">
            <button className="cpm-save-btn" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>

      {typeSheetOpen && (
        <TypeBottomSheet
          selected={form.type}
          onSelect={(t) => setForm((prev) => ({ ...prev, type: t }))}
          onClose={() => setTypeSheetOpen(false)}
        />
      )}
    </>
  );
};

export default CreatePartyModal;
