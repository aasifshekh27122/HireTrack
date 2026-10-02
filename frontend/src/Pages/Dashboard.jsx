import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    screening: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  const [resumeStats, setResumeStats] = useState({
    resumeV1: 0,
    resumeV2: 0,
    resumeV3: 0,
    resumeV4: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const statsResponse = await api.get("/jobs/dashboard/stats", {
          headers,
        });

        const interviewsResponse = await api.get(
          "/jobs/dashboard/upcoming-interviews",
          { headers },
        );
        const resumeResponse = await api.get("/jobs/dashboard/resume-stats", {
          headers,
        });

        setStats(statsResponse.data);
        setUpcomingInterviews(interviewsResponse.data);
        setResumeStats(resumeResponse.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  const chartData = [
    {
      name: "Applied",
      value: stats.applied,
    },
    {
      name: "Screening",
      value: stats.screening,
    },
    {
      name: "Interview",
      value: stats.interview,
    },
    {
      name: "Selected",
      value: stats.selected,
    },
    {
      name: "Rejected",
      value: stats.rejected,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard 📊</h1>
          <p>Track and manage your job applications.</p>
        </div>
      </div>

      {message && <p>{message}</p>}

      {/* STAT CARDS */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <p>Total Applications</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <p>Applied</p>
          <h2>{stats.applied}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔎</div>
          <p>Screening</p>
          <h2>{stats.screening}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <p>Interviews</p>
          <h2>{stats.interview}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <p>Selected</p>
          <h2>{stats.selected}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <p>Rejected</p>
          <h2>{stats.rejected}</h2>
        </div>
      </div>

      {/* ANALYTICS */}

      <div className="analytics-card">
        <div className="analytics-header">
          <h2>Application Analytics 📈</h2>
          <p>Overview of your application status.</p>
        </div>

        {chartData.length === 0 ? (
          <div className="no-chart-data">
            <h3>No application data yet 📭</h3>
            <p>Add some jobs to see your analytics.</p>
          </div>
        ) : (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {/* UPCOMING INTERVIEWS */}

      <div className="interviews-card">
        <div className="interviews-header">
          <h2>Upcoming Interviews 🎯</h2>
          <p>Your next scheduled interviews.</p>
        </div>

        {upcomingInterviews.length === 0 ? (
          <div className="no-interviews">
            <h3>No upcoming interviews 📅</h3>
            <p>Add an interview date to your job application.</p>
          </div>
        ) : (
          <div className="interviews-list">
            {upcomingInterviews.map((job) => (
              <div className="interview-item" key={job._id}>
                <div className="interview-info">
                  <h3>{job.position}</h3>
                  <p>{job.company}</p>
                </div>

                <div className="interview-date">
                  📅 {new Date(job.interviewDate).toLocaleDateString()}
                </div>

                {job.interviewTime && (
                  <div className="interview-time">🕐 {job.interviewTime}</div>
                )}

                {job.interviewType && (
                  <div className="interview-type">💻 {job.interviewType}</div>
                )}

                {job.interviewLocation && (
                  <div className="interview-location">
                    📍 {job.interviewLocation}
                  </div>
                )}

                {job.meetingLink && (
                  <a
                    className="dashboard-meeting-link"
                    href={job.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 Join Interview
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="resume-analytics-card">
        <div className="resume-analytics-header">
          <h2>Resume Usage 📄</h2>
          <p>Track which resume version you used for applications.</p>
        </div>

        <div className="resume-stats-grid">
          <div className="resume-stat-item">
            <span>Resume V1</span>
            <strong>{resumeStats.resumeV1}</strong>
          </div>

          <div className="resume-stat-item">
            <span>Resume V2</span>
            <strong>{resumeStats.resumeV2}</strong>
          </div>

          <div className="resume-stat-item">
            <span>Resume V3</span>
            <strong>{resumeStats.resumeV3}</strong>
          </div>

          <div className="resume-stat-item">
            <span>Resume V4</span>
            <strong>{resumeStats.resumeV4}</strong>
          </div>
        </div>
      </div>

      {/* INFO */}

      <div className="dashboard-info">
        <h2>Application Overview</h2>

        <p>
          Keep applying, track your interviews, and update your application
          status regularly.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
