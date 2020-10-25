const Notes = require('../models/note.model');

const noteController = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({user_id: req.user.id});
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    createNote: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            const newNote = new Note({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            });
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    deleteNote: async (req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.id);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    updateNote: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title,
                content,
                date
            });
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    }
}