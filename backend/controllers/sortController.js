const Sort = require('../models/sort.model');

const sortController = {
    getSort: async (req, res) => {
        try {
            const sort = await Sort.find({user_id: req.user.id});
            res.json(sort);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    createSort: async (req, res) => {
        try {
            const {sort_number} = req.body;
            const newSort = new Sort({
                sort_number: sort_number,
                user_id: req.user.id
            });
            await newSort.save();
            res.json({msg: "Sort Created!"});
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    updateSort: async (req, res) => {
        try {
            const {sort_number} = req.body;
            await Sort.findOneAndUpdate({user_id: req.user.id}, {
                sort_number
            });
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    },

    deleteSort: async (req, res) => {
        try {
            await Sort.findByIdAndDelete(req.params.id);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
    }
    
}

module.exports = sortController;