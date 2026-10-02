import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    jobType: "Full-time",
    status: "Applied",
    salary: "",
    resumeVersion: "Resume V1",
    resumeLink: "",
    applicationDate: "",
    interviewDate: "",
    interviewTime: "",
    interviewType: "Online",
    meetingLink: "",
    interviewLocation: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Job added successfully 🚀");

      setTimeout(() => {
        navigate("/jobs");
      }, 800);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add job");
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>Add New Job 💼</h1>
        <p>Save and track a new job application.</p>
      </div>

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Job Information</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Google"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Position *</label>
              <input
                type="text"
                name="position"
                placeholder="e.g. Software Engineer"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Gurugram"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Application Details</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expected Salary</label>

              <input
                type="text"
                name="salary"
                placeholder="e.g. ₹30,000/month"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Resume Version</label>

              <select
                name="resumeVersion"
                value={formData.resumeVersion}
                onChange={handleChange}
              >
                <option value="Resume V1">Resume V1</option>
                <option value="Resume V2">Resume V2</option>
                <option value="Resume V3">Resume V3</option>
                <option value="Resume V4">Resume V4</option>
              </select>
            </div>

            <div className="form-group">
              <label>Resume Link</label>

              <input
                type="url"
                name="resumeLink"
                placeholder="https://drive.google.com/..."
                value={formData.resumeLink}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Application Date</label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Interview Time</label>
              <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Interview Type</label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            <div className="form-group">
              <label>Meeting Link</label>
              <input
                type="url"
                name="meetingLink"
                placeholder="https://meet.google.com/..."
                value={formData.meetingLink}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Interview Location</label>
              <input
                type="text"
                name="interviewLocation"
                placeholder="e.g. Gurugram Office"
                value={formData.interviewLocation}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Notes</h2>

          <div className="form-group">
            <textarea
              name="notes"
              placeholder="Add interview notes, recruiter details, preparation points..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        {message && <p className="form-message">{message}</p>}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/jobs")}
          >
            Cancel
          </button>

          <button type="submit" className="save-btn">
            Save Job 🚀
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
