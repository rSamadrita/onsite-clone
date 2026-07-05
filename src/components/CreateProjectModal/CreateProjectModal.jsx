import "./CreateProjectModal.css";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/slices/projectSlice";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

const CreateProjectModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();

          setValue("address", data.display_name);

          setValue("latitude", latitude);

          setValue("longitude", longitude);
        } catch {
          alert("Unable to fetch address");
        }

        setLoadingLocation(false);
      },

      () => {
        alert("Permission Denied");

        setLoadingLocation(false);
      },
    );
  };

  const submit = (data) => {
    if (!startDate) {
      alert("Please select Start Date");
      return;
    }

    if (!endDate) {
      alert("Please select End Date");
      return;
    }

    dispatch(
      addProject({
        ...data,

        startDate: startDate.toISOString(),

        endDate: endDate.toISOString(),
      }),
    );

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="project-modal">
        <div className="modal-header">
          <h2>Create New Project</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label>Project Name *</label>

            <input
              placeholder="Dream House"
              {...register("name", {
                required: true,
              })}
            />

            {errors.name && <p className="error">Project name is required</p>}
          </div>

          <div className="form-group">
            <label>Project Address *</label>

            <textarea
              rows={3}
              placeholder="Enter Address"
              {...register("address", {
                required: true,
              })}
            />

            {errors.address && <p className="error">Address required</p>}

            <button
              type="button"
              className="location-btn"
              onClick={getCurrentLocation}
            >
              {loadingLocation ? "Fetching..." : "📍 Use Current Location"}
            </button>
          </div>

          <input type="hidden" {...register("latitude")} />

          <input type="hidden" {...register("longitude")} />

          <div className="date-grid">
            <div className="form-group">
              <label>Start Date *</label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Start Date"
              />
            </div>

            <div className="form-group">
              <label>End Date *</label>

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select End Date"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Value</label>

            <input type="number" placeholder="₹" {...register("value")} />
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
