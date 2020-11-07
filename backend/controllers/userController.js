const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userControl = {
    registerUser: async (req, res) =>{
        try {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
        
            const useremail = await User.findOne({email: email});
            if (useremail) {
                return res.status(400).json({msg: "This email is already in use."});
            }
            const usernamecheck = await User.findOne({username: username});
            if (usernamecheck) {
                return res.status(400).json({msg: "This username is already in use."});
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                password: passwordHash,
                email: email
            });
        
            await newUser.save();
            res.json({msg: "User successfully registered!"});
        } catch (err) {
            res.status(500).json('Error: ' + err);
        }
    },

    loginUser: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email: email});
            if (!user)
            {
                return res.status(400).json({msg: "Email is incorrect. Please try again."});
            }

            const passIsMatch = await bcrypt.compare(password, user.password);
            if (!passIsMatch)
            {
                return res.status(400).json({msg: "Password is incorrect. Please try again."});
            }

            const payload = {id: user._id, name: user.username};
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"});

            res.json({token});
        } catch (err) {
            res.status(500).json('Error: ' + err);
        }
    },

    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization");
            if (!token) {
                return res.send(false);
            }

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) {
                    return res.send(false);
                }

                const user = await User.findById(verified.id);
                if (!user) {
                    return res.send(false);
                } 
                
                return res.send(true);
            })
        } catch (err) {
            res.status(500).json('Error: ' + err);
        }
    },

    /*getState: (req, res) => {
        try {
            const sort = User.find({user_id: req.user.id});
            res.json(sort.sort);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
        User.find({sort: sort});
    },

    setSort: (req, res) => {
        try {
            const sort_id = req.body;
            res.json(sort.sort);
        } catch (err) {
            return res.status(400).json('Error: ' + err);
        }
        User.find({sort: sort});
    }*/
}

module.exports = userControl;