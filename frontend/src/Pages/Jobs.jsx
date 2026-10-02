import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((oldJobs) => oldJobs.filter((job) => job._id !== id));

      setMessage("Job deleted successfully 🗑️");
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (job.company || "").toLowerCase().includes(searchText) ||
      (job.position || "").toLowerCase().includes(searchText);

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>My Job Applications 💼</h1>
          <p>Manage and track all your job applications.</p>
        </div>

        <Link to="/add-job">
          <button className="add-job-btn">+ Add New Job</button>
        </Link>
      </div>

      <div className="jobs-filters">
        <input
          type="text"
          placeholder="🔎 Search company or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {message && <p className="jobs-message">{message}</p>}

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h2>No job applications yet 📭</h2>
          <p>Start tracking your applications.</p>

          <Link to="/add-job">
            <button>Add Your First Job</button>
          </Link>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <h2>No matching jobs found 🔎</h2>
          <p>Try changing your search or filter.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-top">
                <div>
                  <h2>{job.position}</h2>
                  <h3>{job.company}</h3>
                </div>

                <span
                  className={`status-badge ${job.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="job-details">
                <p>📍 {job.location || "Location not specified"}</p>

                <p>💼 {job.jobType}</p>

                <p>💰 {job.salary || "Salary not specified"}</p>

                {job.applicationDate && (
                  <p>
                    📅 Applied:{" "}
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </p>
                )}
                {job.interviewDate && (
                  <div className="interview-info">
                    <p>
                      🎯 <strong>Interview:</strong>{" "}
                      {new Date(job.interviewDate).toLocaleDateString()}
                    </p>

                    {job.interviewTime && (
                      <p>
                        🕐 <strong>Time:</strong> {job.interviewTime}
                      </p>
                    )}

                    {job.interviewType && (
                      <p>
                        💻 <strong>Type:</strong> {job.interviewType}
                      </p>
                    )}

                    {job.interviewLocation && (
                      <p>
                        📍 <strong>Location:</strong> {job.interviewLocation}
                      </p>
                    )}

                    {job.meetingLink && (
                      <a
                        className="meeting-link"
                        href={job.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        🔗 Join Interview
                      </a>
                    )}
                  </div>
                )}
                {job.notes && <p>📝 {job.notes}</p>}
                {(job.resumeVersion || job.resumeLink) && (
                  <div className="resume-info">
                    <p>
                      📄 <strong>{job.resumeVersion || "Resume V1"}</strong>
                    </p>

                    {job.resumeLink && (
                      <a
                        className="resume-link"
                        href={job.resumeLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume ↗
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="job-actions">
                <Link to={`/edit-job/${job._id}`}>
                  <button className="edit-btn">✏️ Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
