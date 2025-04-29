import { ProjectNote } from "../models/note.models.js";

const getNotes = async (req, res) => {
  try {
    const allNotes = await ProjectNote.find({});
    return res.status(200).json({
      message: "All notes found",
      success: true,
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes" });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await ProjectNote.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({
      message: "Note found",
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching note" });
  }
};

const createNote = async (req, res) => {
  const { project, createdBy, content } = req.body;
  if (!project || !createdBy || !content) {
    return res.status(400).json({
      message: "Please provide complete details for creating a note.",
    });
  }

  try {
    const newNote = await ProjectNote.create({ project, createdBy, content });
    return res.status(201).json({
      message: "Created new note",
      success: true,
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating note" });
  }
};

const updateNote = async (req, res) => {
  const { id, project, createdBy, content } = req.body;
  try {
    const note = await ProjectNote.findByIdAndUpdate(
      id,
      { project, createdBy, content },
      { new: true },
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Updated note successfully",
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating note" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Note ID not provided" });
  }

  try {
    await ProjectNote.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Note deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting note" });
  }
};

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
