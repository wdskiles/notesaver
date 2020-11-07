const router = require('express').Router();
const auth = require('../middleware/auth');
const sortController = require('../controllers/sortController');

router.route('/')
  .get(auth, sortController.getSort)
  .post(auth, sortController.createSort)
  .put(auth, sortController.updateSort);

  router.route('/:id')
  //.get(auth, sortController.getNote)
  //.put(auth, sortController.updateSort)
  .delete(auth, sortController.deleteSort);

module.exports = router;