const Note = require('../models/note.model');

const noteController = {
    getNotes: async (req, res) => {
        try {
            const notes = await Note.find({user_id: req.user.id});
            res.json(notes);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    createNote: async (req, res) => {
        try {
            const {title, content, category, date} = req.body;
            const newNote = new Note({
                title,
                content,
                date,
                category,
                user_id: req.user.id,
                name: req.user.name
            });
            await newNote.save();
            res.json({msg: "Note Created!"});
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    deleteNote: async (req, res) => {
        try {
            await Note.findByIdAndDelete(req.params.id);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    updateNote: async (req, res) => {
        try {
            const {title, content, date, category} = req.body;
            await Note.findOneAndUpdate({_id: req.params.id}, {
                title,
                content,
                date,
                category
            });
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    getNote: async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);
            res.json(note);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    }
}

module.exports = noteController;