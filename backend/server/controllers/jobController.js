const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE JOB
const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user,
    });

    const stats = {
      total: jobs.length,
      applied: jobs.filter((job) => job.status === "Applied").length,
      screening: jobs.filter((job) => job.status === "Screening").length,
      interview: jobs.filter((job) => job.status === "Interview").length,
      selected: jobs.filter((job) => job.status === "Selected").length,
      rejected: jobs.filter((job) => job.status === "Rejected").length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// UPCOMING INTERVIEWS
const getUpcomingInterviews = async (req, res) => {
  try {
    const today = new Date();

    const jobs = await Job.find({
      user: req.user,
      interviewDate: {
        $gte: today,
      },
    })
      .sort({
        interviewDate: 1,
      })
      .limit(5);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// RESUME VERSION STATS
const getResumeVersionStats = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user,
    });

    const stats = {
      resumeV1: jobs.filter((job) => job.resumeVersion === "Resume V1").length,

      resumeV2: jobs.filter((job) => job.resumeVersion === "Resume V2").length,

      resumeV3: jobs.filter((job) => job.resumeVersion === "Resume V3").length,

      resumeV4: jobs.filter((job) => job.resumeVersion === "Resume V4").length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getDashboardStats,
  getUpcomingInterviews,
  getResumeVersionStats,
};
