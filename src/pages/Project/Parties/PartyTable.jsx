import "./PartyTable.scss";

import { useMemo, useState } from "react";

import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdSearch,
  MdPerson,
} from "react-icons/md";

const FILTERS = [
  "All",
  "Client",
  "Vendor",
  "Contractor",
  "Staff",
  "Worker",
];

const PartyTable = ({ parties = [] }) => {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      const matchesSearch =
        party.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        party.phone
          ?.includes(search);

      const matchesFilter =
        filter === "All" ||
        party.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [parties, search, filter]);

  return (
    <div className="party-table-wrapper">

      <div className="party-toolbar">

        <div className="search-box">

          <MdSearch />

          <input
            placeholder="Search party..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="filter-group">

          {FILTERS.map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

      </div>

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

            <p>

              Start by adding your
              first client,
              vendor or employee.

            </p>

          </div>

        ) : (

          filteredParties.map((party) => (

            <div
              className="table-row"
              key={party.id}
            >

              <span>{party.name}</span>

              <span>

                <div className="party-chip">

                  {party.type}

                </div>

              </span>

              <span>

                {party.phone}

              </span>

              <span>

                ₹{" "}

                {Number(
                  party.balance || 0
                ).toLocaleString(
                  "en-IN"
                )}

              </span>

              <span className="actions">

                <button>

                  <MdVisibility />

                </button>

                <button>

                  <MdEdit />

                </button>

                <button className="delete">

                  <MdDelete />

                </button>

              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default PartyTable;