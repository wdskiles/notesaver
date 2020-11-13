const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

    resetPassword: async (req, res) => {
        try {
            console.log(req.body);
            const {newPassword, username, userPassword} = req.body;
            //const {username} = req.body.username;

            const user = await User.findOne({email: username});
            if (!user)
            {
                return res.json({msg: "Email is incorrect. Please try again."});
            }
            const passIsMatch = await bcrypt.compare(userPassword, user.password);
            if (!passIsMatch)
            {
                return res.json({msg: "Old Password is incorrect. Please try again."});
            }

            console.log(newPassword);
            hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate({email: username}, {password: hashedPassword})
            .then(res.json({msg: "Password successfully reset!"}));
        } catch (err) {
            console.log(err);
            return res.status(400).json('Error: ' + err);
        }
    },

    // Old resetPassword for using email
    /*resetPassword: (req, res) => {
        crypto.randomBytes(32, (error, buffer) => {
            if (error) {
                console.log(err);
            }
            const token = buffer.toString("hex");
            User.findOne({email: req.body.email})
            .then(user =>{
                if (!user) {
                    return res.status(422).json({error: "There is no user with that email."});
                }
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000; // Makes token valid for 1 hour
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@notesaver.com",
                        subject: "Password Reset for Notesaver",
                        html: `
                        <p>A password reset was requested for the account associated with this email address.</p>
                        <h5>Click <a href="http://localhost:3000/reset/${token}">here</a> to reset your password.</h5> 
                        <p>If you did not request the password reset, feel free to ignore this email.</p>
                        `
                    });
                    res.json({message: "Password Reset request sent. Please check your email for a password reset link."});
                })
            });
        })
    },*/

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