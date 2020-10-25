const router = require('express').Router();
let Note = require('../models/note.model');
const auth = require('../middleware/auth');
const noteController = require('../controllers/noteController');

router.route('/')
  .get(auth, noteController.getNotes)
  .post(auth, noteController.createNote)

router.route('/:id')
  .get(auth,noteController.getNote)
  .put(auth,noteController.updateNote)
  .delete(auth,noteController.deleteNote)

/*router.route('/').get((req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  const category = req.body.category;
  const user = req.body.user;
  const date = Date.parse(req.body.date);

  const newNote = new Note({
    title,
    contents,
    category,
    user,
    date,
  });

  newNote.save()
  .then(() => res.json('Note added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Find Note
router.route('/:id').get((req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Note
router.route('/:id').delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Save Note
router.route('/update/:id').post((req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.title = req.body.title;
      note.contents = req.body.contents;
      note.category = req.body.category;
      note.user = req.body.user;
      note.date = Date.parse(req.body.date);

      note.save()
        .then(() => res.json('Note updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;