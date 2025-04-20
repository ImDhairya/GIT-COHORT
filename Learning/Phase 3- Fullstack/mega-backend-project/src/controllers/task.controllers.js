import { SubTask } from "../models/subtask.models";
import { Task } from "../models/task.models";

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({
      message: "All tasks details",
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get tasks details",
      success: false,
    });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide the task ID",
      success: false,
    });
  }
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Task retrieved",
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get task details",
      success: false,
    });
  }
};

const createTask = async (req, res) => {
  const assignedBy = req.user.id;
  const { title, description, project, assignedTo, status, attachments } =
    req.body;

  if (!title || !description || !project || !assignedTo || !status) {
    return res.status(400).json({
      message: "Please provide all task details.",
      success: false,
    });
  }

  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      assignedBy,
      status,
      attachments,
    });

    return res.status(201).json({
      message: "Task created",
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create task.",
      success: false,
    });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const assignedBy = req.user.id;
  const { title, description, project, assignedTo, status, attachments } =
    req.body;

  if (!title || !description || !project || !assignedTo || !status) {
    return res.status(400).json({
      message: "Please provide all task details.",
      success: false,
    });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        project,
        assignedBy,
        assignedTo,
        status,
        attachments,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task updated",
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update task.",
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Task deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete task.",
      success: false,
    });
  }
};

const createSubTask = async (req, res) => {
  const createdBy = req.user.id;
  const { title, task, isCompleted } = req.body;

  if (!title || !task || typeof isCompleted !== "boolean") {
    return res.status(400).json({
      message: "Please provide all subtask details.",
      success: false,
    });
  }

  try {
    const subtask = await SubTask.create({
      title,
      task,
      isCompleted,
      createdBy,
    });

    return res.status(201).json({
      message: "Subtask created",
      success: true,
      data: subtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create subtask.",
      success: false,
    });
  }
};

const updateSubTask = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.id;
  const { title, task, isCompleted } = req.body;

  if (!title || !task || typeof isCompleted !== "boolean") {
    return res.status(400).json({
      message: "Please provide all subtask details.",
      success: false,
    });
  }

  try {
    const updatedSubtask = await SubTask.findByIdAndUpdate(
      id,
      { title, task, isCompleted, createdBy },
      { new: true },
    );

    if (!updatedSubtask) {
      return res.status(404).json({
        message: "Subtask not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Subtask updated",
      success: true,
      data: updatedSubtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update subtask.",
      success: false,
    });
  }
};

const deleteSubTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubtask = await SubTask.findByIdAndDelete(id);

    if (!deletedSubtask) {
      return res.status(404).json({
        message: "Subtask not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Subtask deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete subtask.",
      success: false,
    });
  }
};

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
};
