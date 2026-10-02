const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },

    status: {
      type: String,
      enum: ["Applied", "Screening", "Interview", "Selected", "Rejected"],
      default: "Applied",
    },

    salary: { type: String },

    resumeVersion: {
      type: String,
      default: "Resume V1",
    },

    resumeLink: {
      type: String,
      trim: true,
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    interviewDate: {
      type: Date,
    },
    interviewTime: {
      type: String,
    },

    interviewType: {
      type: String,
      enum: ["Online", "Offline", "Phone"],
    },

    meetingLink: {
      type: String,
      trim: true,
    },

    interviewLocation: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
