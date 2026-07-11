import "./MaterialTab.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMaterial, updateStock } from "../../../redux/slices/materialSlice";

const SUB_TABS = ["Inventory", "Request", "Received", "Used"];

const SHEET_ACTIONS = [
  { label: "+ Request",           color: "#ede7f6", textColor: "#5c35c9" },
  { label: "+ Received",          color: "#e8f5e9", textColor: "#2e7d32" },
  { label: "+ Purchased",         color: "#ede7f6", textColor: "#5c35c9" },
  { label: "+ Used",              color: "#fce4ec", textColor: "#c2185b" },
  { label: "+ Subcon Issued",     color: "#ede7f6", textColor: "#5c35c9" },
  { label: "+ Material Transfer", color: "#ede7f6", textColor: "#5c35c9" },
];

const AddMaterialForm = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [qty, setQty] = useState(0);

  const handleSave = () => {
    if (!name.trim()) { alert("Material name is required."); return; }
    onSave({ name: name.trim(), unit: unit.trim(), inStock: Number(qty) });
  };

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <p className="sheet-title">Add Material</p>
        <div className="mat-form">
          <label>Material Name *</label>
          <input placeholder="e.g. Bricks" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Unit</label>
          <input placeholder="e.g. numbers, bags, pcs" value={unit} onChange={(e) => setUnit(e.target.value)} />
          <label>Opening Stock</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
          <button className="mat-save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

const MaterialTab = ({ projectId }) => {
  const dispatch = useDispatch();
  const materials = useSelector(
    (state) => state.materials.byProject[projectId] || []
  );

  const [activeTab, setActiveTab] = useState("Inventory");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);

  const filtered = materials.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMaterial = (data) => {
    dispatch(addMaterial({ projectId, ...data }));
    setAddFormOpen(false);
  };

  const handleStock = (materialId, delta) => {
    dispatch(updateStock({ projectId, materialId, delta }));
  };

  return (
    <div className="material-tab">
      {/* Sub-tabs */}
      <div className="mat-subtabs">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            className={`mat-subtab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Inventory" && (
        <>
          {/* Search + Add */}
          <div className="mat-toolbar">
            <div className="mat-search">
              <span className="mat-search-icon">🔍</span>
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="mat-add-btn"
              onClick={() => setAddFormOpen(true)}
            >
              + Add Material
            </button>
          </div>

          {/* Column headers */}
          {filtered.length > 0 && (
            <div className="mat-list-header">
              <span className="mat-list-header-label">OTHERS</span>
              <span className="mat-list-header-label">IN STOCK</span>
            </div>
          )}

          {/* Material rows */}
          {filtered.length === 0 ? (
            <div className="mat-empty">
              <p>No materials yet. Tap + Add Material to get started.</p>
            </div>
          ) : (
            <div className="mat-list">
              {filtered.map((m) => (
                <div className="mat-row" key={m.id}>
                  <div className="mat-row-info">
                    <span className="mat-name">{m.name}</span>
                    {m.unit && <span className="mat-unit">{m.unit}</span>}
                  </div>
                  <div className="mat-stock-ctrl">
                    <button
                      className="stock-btn minus"
                      onClick={() => handleStock(m.id, -1)}
                    >
                      −
                    </button>
                    <span className="stock-val">{m.inStock}</span>
                    <button
                      className="stock-btn plus"
                      onClick={() => handleStock(m.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab !== "Inventory" && (
        <div className="mat-empty">
          <p>No {activeTab.toLowerCase()} records yet.</p>
        </div>
      )}

      {/* FAB */}
      <button className="mat-fab" onClick={() => setSheetOpen(true)}>
        +
      </button>

      {/* Action bottom sheet */}
      {sheetOpen && (
        <div className="bottom-sheet-overlay" onClick={() => setSheetOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <p className="sheet-title">Material</p>
            <div className="mat-sheet-grid">
              {SHEET_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="mat-sheet-btn"
                  style={{ background: a.color, color: a.textColor }}
                  onClick={() => {
                    setSheetOpen(false);
                    if (a.label === "+ Received" || a.label === "+ Purchased") {
                      setAddFormOpen(true);
                    }
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add material form */}
      {addFormOpen && (
        <AddMaterialForm
          onSave={handleAddMaterial}
          onClose={() => setAddFormOpen(false)}
        />
      )}
    </div>
  );
};

export default MaterialTab;
