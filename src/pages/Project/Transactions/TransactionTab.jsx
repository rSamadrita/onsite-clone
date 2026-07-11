import "./TransactionTab.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../../../redux/slices/transactionSlice";

const TRANSACTION_TYPES = [
  { label: "Payment Out", color: "#ffebee", textColor: "#e53935", section: null },
  { label: "Payment In", color: "#e8f5e9", textColor: "#2e7d32", section: null },
  { label: "Material Purchase", color: "#ede7f6", textColor: "#5c35c9", section: "Expense" },
  { label: "Material Transfer", color: "#ede7f6", textColor: "#5c35c9", section: "Expense" },
  { label: "Other Expense", color: "#ede7f6", textColor: "#5c35c9", section: "Expense" },
  { label: "Equipment Expense", color: "#ede7f6", textColor: "#5c35c9", section: "Expense" },
  { label: "I Paid", color: "#ffebee", textColor: "#e53935", section: "My Account" },
  { label: "I Received", color: "#e8f5e9", textColor: "#2e7d32", section: "My Account" },
];

const TransactionTab = ({ projectId }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.transactions.byProject[projectId] || []
  );

  const [sheetOpen, setSheetOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // Compute stats
  const totalIn = transactions
    .filter((t) => ["Payment In", "I Received"].includes(t.type))
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  const totalOut = transactions
    .filter((t) =>
      ["Payment Out", "Material Purchase", "Material Transfer", "Other Expense", "Equipment Expense", "I Paid"].includes(t.type)
    )
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  const balance = totalIn - totalOut;

  const totalExpense = transactions
    .filter((t) =>
      ["Material Purchase", "Material Transfer", "Other Expense", "Equipment Expense"].includes(t.type)
    )
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSheetOpen(false);
    setAmount("");
    setNote("");
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    dispatch(
      addTransaction({
        projectId,
        type: selectedType.label,
        amount: Number(amount),
        note,
      })
    );
    setFormOpen(false);
    setSelectedType(null);
    setAmount("");
    setNote("");
  };

  // Group sheet items
  const topItems = TRANSACTION_TYPES.filter((t) => t.section === null);
  const expenseItems = TRANSACTION_TYPES.filter((t) => t.section === "Expense");
  const accountItems = TRANSACTION_TYPES.filter((t) => t.section === "My Account");

  return (
    <div className="transaction-tab">
      {/* Stats bar */}
      <div className="txn-stats-row">
        <div className="txn-stat">
          <span className="txn-stat-label">BALANCE</span>
          <span className={`txn-stat-value ${balance >= 0 ? "green" : "red"}`}>
            {balance}
          </span>
        </div>
        <div className="txn-stat">
          <span className="txn-stat-label">TOTAL IN</span>
          <span className="txn-stat-value green">{totalIn}</span>
        </div>
        <div className="txn-stat">
          <span className="txn-stat-label">TOTAL OUT</span>
          <span className="txn-stat-value red">{totalOut}</span>
        </div>
      </div>
      <div className="txn-stats-row txn-stats-row--secondary">
        <div className="txn-stat">
          <span className="txn-stat-label">INVOICE</span>
          <span className="txn-stat-value">₹ 0</span>
        </div>
        <div className="txn-stat">
          <span className="txn-stat-label">TOTAL EXPENSE</span>
          <span className="txn-stat-value red">₹ {totalExpense.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Transaction list */}
      {transactions.length === 0 ? (
        <div className="txn-empty">
          <p>No transactions yet. Tap + to add one.</p>
        </div>
      ) : (
        <div className="txn-list">
          {transactions.map((t) => (
            <div className="txn-item" key={t.id}>
              <div className="txn-item-left">
                <span className="txn-type-badge">{t.type}</span>
                {t.note && <p className="txn-note">{t.note}</p>}
                <p className="txn-date">
                  {new Date(t.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <span
                className={`txn-amount ${
                  ["Payment In", "I Received"].includes(t.type) ? "green" : "red"
                }`}
              >
                {["Payment In", "I Received"].includes(t.type) ? "+" : "-"}₹{" "}
                {Number(t.amount).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button className="txn-fab" onClick={() => setSheetOpen(true)}>
        +
      </button>

      {/* Bottom sheet — type selector */}
      {sheetOpen && (
        <div className="bottom-sheet-overlay" onClick={() => setSheetOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <p className="sheet-title">Transaction</p>

            <div className="sheet-top-row">
              {topItems.map((t) => (
                <button
                  key={t.label}
                  className="sheet-btn"
                  style={{ background: t.color, color: t.textColor }}
                  onClick={() => handleTypeSelect(t)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="sheet-section-label">Expense</p>
            <div className="sheet-grid">
              {expenseItems.map((t) => (
                <button
                  key={t.label}
                  className="sheet-btn"
                  style={{ background: t.color, color: t.textColor }}
                  onClick={() => handleTypeSelect(t)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="sheet-section-label">My Account</p>
            <div className="sheet-top-row">
              {accountItems.map((t) => (
                <button
                  key={t.label}
                  className="sheet-btn"
                  style={{ background: t.color, color: t.textColor }}
                  onClick={() => handleTypeSelect(t)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Amount entry form */}
      {formOpen && selectedType && (
        <div className="bottom-sheet-overlay" onClick={() => setFormOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <p className="sheet-title">{selectedType.label}</p>
            <div className="txn-form">
              <label>Amount *</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label>Note</label>
              <input
                type="text"
                placeholder="Optional note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button className="txn-save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTab;
