import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { AvailableUserRoles } from "../utils/constants.js";

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json({
      message: "Found all projects",
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting projects",
      success: false,
    });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Project ID not provided",
      success: false,
    });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Project found",
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving project",
      success: false,
    });
  }
};

const createProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  if (!name || !description) {
    return res.status(400).json({
      message: "Please provide all required fields",
      success: false,
    });
  }

  try {
    const project = await Project.create({
      name,
      description,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Project created successfully",
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error, "error creating project");
    return res.status(500).json({
      message: "Error creating project",
      success: false,
    });
  }
};

const updateProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;
  console.log(userId);

  try {
    const project = await Project.findOneAndUpdate(
      { createdBy: userId },
      { name, description },
      { new: true },
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found for current user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating project",
      success: false,
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    return res.status(400).json({
      message: "Project ID not provided",
      success: false,
    });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // check if the correct user is only deleting or not

    if (!project.createdBy.equals(userId)) {
      return res.status(401).json({
        message: " you are not authorized to delete this project",
      });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting project",
      success: false,
    });
  }
};

const getProjectMembers = async (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);
  try {
    const project = await Project.findOne({
      _id: projectId,
    });

    const members = project.projectMembers;
    return res.status(200).json({
      message: "Found all project members",
      success: true,
      data: members,
    });
  } catch (error) {
    console.log(error, "error fetching project member.");
    return res.status(500).json({
      message: "Error fetching project members",
      success: false,
    });
  }
};

const addMemberToProject = async (req, res) => {
  const { project, role } = req.body;
  const user = req.user._id;

  if (!project || !role) {
    return res.status(400).json({
      message: "Project and role are required",
      success: false,
    });
  }

  try {
    const newMember = await ProjectMember.create({
      user,
      project,
      role,
    });

    await Project.findByIdAndUpdate(project, {
      $push: { projectMembers: newMember._id },
    });

    return res.status(201).json({
      message: "Project member added",
      success: true,
      data: newMember,
    });
  } catch (error) {
    console.log(error, "error adding member to project.");
    return res.status(500).json({
      message: "Error adding project member",
      success: false,
    });
  }
};

const deleteMember = async (req, res) => {
  const projectId = req.params.id;
  const { user } = req.body;

  // 1st will remove from project.projectmember

  // 2ndly we will removve the id holder from projectmembers schema

  try {
    const projectMember = await ProjectMember.findOne({
      user,
      project: projectId,
    });

    await Project.findByIdAndUpdate(projectId, {
      $pull: { projectMembers: projectMember._id },
    });

    await ProjectMember.findByIdAndDelete(projectMember._id);

    return res.status(200).json({
      message: "Member removed from project",
      success: true,
      data: { deletedMember, project },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting member",
      success: false,
    });
  }
};

const updateMemberRole = async (req, res) => {
  const user = req.user.id;
  const { memberRole } = req.body;
  const { id } = req.params;
  console.log(id, "MEMBERROLE");
  const userRolesToAllow = AvailableUserRoles;
  console.log(userRolesToAllow, "fewe");

  if (!userRolesToAllow.includes(memberRole)) {
    return res.status(400).json({
      message: "This user role is not allowed.",
    });
  }
  try {
    const updatedMember = await ProjectMember.findOneAndUpdate(
      { _id: id },
      { role: memberRole },
      { new: true }, // to get back the updated document
    );

    if (updatedMember) {
      return res.status(200).json({
        message: "Member role updated",
        success: true,
        data: updatedMember,
      });
    } else {
      return res.status(400).json({
        message: "Unable to update member role",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating member role",
      success: false,
    });
  }
};

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  addMemberToProject,
  deleteMember,
  updateMemberRole,
};
