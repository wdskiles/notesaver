const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userControl = {
    registerUser: async (req, res) =>{
        try {
            const username = req.body.username;
            const password = req.body.password;

            const usernamecheck = await User.findOne({username: username});
            if (usernamecheck) {
                return res.status(400).json({msg: "This username is already in use."});
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                password: passwordHash
            });
        
            await newUser.save();
            res.json({msg: "User successfully registered!"});
        } catch (err) {
            res.status(500).json('Error: ' + err);
        }
    },

    loginUser: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = await User.findOne({username: username});
            if (!user)
            {
                return res.status(400).json({msg: "Username is incorrect. Please try again."});
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

    resetPassword: async (req, res) => {
        try {
            const {newPassword, username, userPassword} = req.body;

            const user = await User.findOne({username: username});
            if (!user)
            {
                return res.json({msg: "Username is incorrect. Please try again."});
            }
            const passIsMatch = await bcrypt.compare(userPassword, user.password);
            if (!passIsMatch)
            {
                return res.json({msg: "Old Password is incorrect. Please try again."});
            }
            hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate({username: username}, {password: hashedPassword})
            .then(res.json({msg: "Password successfully reset!"}));
        } catch (err) {
            console.log(err);
            return res.status(400).json('Error: ' + err);
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
    }
}

module.exports = userControl;