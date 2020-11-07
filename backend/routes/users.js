const router = require('express').Router();
const userControl = require('../controllers/userController');
let User = require('../models/user.model');
const auth = require('../middleware/auth');

/*router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

// Register User
router.post('/register', userControl.registerUser);

// Change User Info
/*router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.username = req.body.username;
        user.description = req.body.password;
        user.duration = req.body.email;
  
        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});*/

// Log in User
router.post('/login', userControl.loginUser);

router.get('/verify', userControl.verifiedToken);

//router.get('/state', userControl.getState);
//router.put('/state', userControl.setState);

module.exports = router;