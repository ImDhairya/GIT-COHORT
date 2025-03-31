import mongoose from "mongoose";
import { AvailableUsersRoles, UserRolesEnum } from "../utils/constants.js";

const ProjectMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUsersRoles,
      default: UserRolesEnum.MEMBER,
    },
  },
  { timestamps: true },
);

export const ProjectMember = mongoose.model(
  "ProjectMember",
  ProjectMemberSchema,
);
