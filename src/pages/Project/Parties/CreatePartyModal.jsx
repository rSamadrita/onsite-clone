import "./CreatePartyModal.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addParty } from "../../redux/slices/partySlice";

const PARTY_TYPES = [
  "Client",
  "Vendor",
  "Contractor",
  "Staff",
  "Worker",
  "Architect",
  "Engineer",
  "Supplier"
];

const CreatePartyModal = ({ onClose }) => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({

    type: "Client",

    name: "",

    company: "",

    phone: "",

    email: "",

    address: "",

    gst: "",

    balance: 0

  });

  const changeHandler = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const saveParty = () => {

    if (!form.name || !form.phone) {

      alert("Please fill mandatory fields.");

      return;

    }

    dispatch(

      addParty({

        id: Date.now(),

        ...form

      })

    );

    onClose();

  };

  return (

    <div className="party-modal-overlay">

      <div className="party-modal">

        <div className="modal-header">

          <div>

            <h2>Create Party</h2>

            <p>

              Add a client, vendor, staff or contractor.

            </p>

          </div>

          <button onClick={onClose}>✕</button>

        </div>

        <div className="party-form">

          <div className="field">

            <label>Party Type</label>

            <select

              name="type"

              value={form.type}

              onChange={changeHandler}

            >

              {

                PARTY_TYPES.map(type => (

                  <option

                    key={type}

                    value={type}

                  >

                    {type}

                  </option>

                ))

              }

            </select>

          </div>

          <div className="field">

            <label>Name *</label>

            <input

              name="name"

              value={form.name}

              onChange={changeHandler}

            />

          </div>

          <div className="field">

            <label>Company</label>

            <input

              name="company"

              value={form.company}

              onChange={changeHandler}

            />

          </div>

          <div className="field">

            <label>Phone *</label>

            <input

              name="phone"

              value={form.phone}

              onChange={changeHandler}

            />

          </div>

          <div className="field">

            <label>Email</label>

            <input

              name="email"

              value={form.email}

              onChange={changeHandler}

            />

          </div>

          <div className="field full">

            <label>Address</label>

            <textarea

              rows="3"

              name="address"

              value={form.address}

              onChange={changeHandler}

            />

          </div>

          <div className="field">

            <label>GST Number</label>

            <input

              name="gst"

              value={form.gst}

              onChange={changeHandler}

            />

          </div>

          <div className="field">

            <label>Opening Balance</label>

            <input

              type="number"

              name="balance"

              value={form.balance}

              onChange={changeHandler}

            />

          </div>

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >

            Cancel

          </button>

          <button
            className="save-btn"
            onClick={saveParty}
          >

            Save Party

          </button>

        </div>

      </div>

    </div>

  );

};

export default CreatePartyModal;