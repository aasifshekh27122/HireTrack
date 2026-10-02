const express = require("express");

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getDashboardStats,
  getUpcomingInterviews,
  getResumeVersionStats,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.get("/dashboard/stats", protect, getDashboardStats);

router.get("/dashboard/upcoming-interviews", protect, getUpcomingInterviews);

router.get("/dashboard/resume-stats", protect, getResumeVersionStats);

router.get("/:id", protect, getJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;
