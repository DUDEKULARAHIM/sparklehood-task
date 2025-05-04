













import React, { useState, useEffect } from "react";
import "./IncidentDashboard.css";

const IncidentDashboard = () => {
  const initialIncidents = [
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
      isUserAdded: true,
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
      isUserAdded: false,
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description: "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
      isUserAdded: false,
    },
    {
      id: 4,
      title: "Unauthorized Data Access by User",
      description: "User accessed restricted personal data through a bug in the authentication process.",
      severity: "High",
      reported_at: "2025-04-10T11:30:00Z",
      isUserAdded: false,
    },
    {
      id: 5,
      title: "AI Model Overfitting",
      description: "AI model performance degraded due to overfitting on training data, leading to inaccurate predictions.",
      severity: "Medium",
      reported_at: "2025-04-18T16:45:00Z",
      isUserAdded: false,
    },
  ];

  const [incidents, setIncidents] = useState(initialIncidents);
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Low",
  });
  const [editModeId, setEditModeId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    severity: "Low",
  });
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const handleFilterChange = (e) => {
    setFilterSeverity(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleToggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newIncident = {
      id: incidents.length + 1,
      title: formData.title,
      description: formData.description,
      severity: formData.severity,
      reported_at: new Date().toISOString(),
      isUserAdded: true,
    };

    setIncidents([newIncident, ...incidents]);
    setFormData({ title: "", description: "", severity: "Low" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      setIncidents(incidents.filter((incident) => incident.id !== id));
    }
  };

  const handleEdit = (incident) => {
    setEditModeId(incident.id);
    setEditData({
      title: incident.title,
      description: incident.description,
      severity: incident.severity,
    });
  };

  const handleUpdateSubmit = (id) => {
    const updatedIncidents = incidents.map((incident) =>
      incident.id === id
        ? { ...incident, ...editData }
        : incident
    );
    setIncidents(updatedIncidents);
    setEditModeId(null);
  };

  const filteredIncidents = incidents
    .filter((incident) => {
      const matchesSeverity = filterSeverity === "All" || incident.severity === filterSeverity;
      const incidentDate = new Date(incident.reported_at);

      if (sortOrder === "Custom" && customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        return matchesSeverity && incidentDate >= start && incidentDate <= end;
      }

      return matchesSeverity;
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.reported_at) - new Date(a.reported_at);
      } else if (sortOrder === "Oldest") {
        return new Date(a.reported_at) - new Date(b.reported_at);
      } else {
        return 0; // No extra sorting for Custom
      }
    });

  return (
    <div className="dashboard-container">
      <h1>AI Safety Incident Dashboard</h1>

      <div className="controls">
        <select value={filterSeverity} onChange={handleFilterChange}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortOrder} onChange={handleSortChange}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="Custom">Custom (Between Dates)</option>
        </select>

        {sortOrder === "Custom" && (
          <div className="custom-date-picker">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="incident-list">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            {editModeId === incident.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditInputChange}
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditInputChange}
                />
                <select
                  name="severity"
                  value={editData.severity}
                  onChange={handleEditInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button onClick={() => handleUpdateSubmit(incident.id)}>Save</button>
                <button onClick={() => setEditModeId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="incident-title">{incident.title}</div>

                <div className="incident-details">
                  <div className="incident-detail-item">
                    <span>Severity: </span>
                    <span>{incident.severity}</span>
                  </div>
                  <div className="incident-detail-item">
                    <span>Reported: </span>
                    <span>{new Date(incident.reported_at).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  className="view-details-button"
                  onClick={() => handleToggleDetails(incident.id)}
                >
                  {expandedId === incident.id ? "Hide Details" : "View Details"}
                </button>

                {incident.isUserAdded && (
                  <div className="incident-actions">
                    <button className="edit-btn" onClick={() => handleEdit(incident)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(incident.id)}>Delete</button>
                  </div>
                )}

                {expandedId === incident.id && (
                  <div className="incident-description">
                    <p>{incident.description}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      

      <div className="report-form">
        <h2>Report New Incident</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Incident Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Incident Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <select
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Submit Incident</button>
        </form>
      </div>


      <div className="note-section">
        <h2>Note</h2>
        <p>
          This section contains important notes and information relevant to the incident reporting system.
        </p>
        <p>
          You can always refer to this note for guidance on how to handle specific incidents, 
          and ensure that all necessary steps are followed for each report.
        </p>
      </div>



    </div>
  );
};

export default IncidentDashboard;
