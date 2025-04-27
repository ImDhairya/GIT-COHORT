import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ProjectMember",
      },
    ],
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", ProjectSchema);
