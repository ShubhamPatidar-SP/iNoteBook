const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');

// jwt web token for signature the tokan 
const JWT_SECRETE = "this is the very secrete string";

// ROUTER  1 =====================================================================================
// create a user using POST "api/auth" dosent require path NO login require
// checking validation for the data 
router.post('/createuser', [
    body('name', 'Enter a valid name ').isLength({ min: 3 }),
    body('email', 'Enter a valid email type ').isEmail(),
    body('password', 'Enter a valid password type ').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);                                   //storing validation result in the errors
    if (!errors.isEmpty()) {                                                // if error is not empty means there is some error in it
        return res.status(404).json({ success, errors: errors.array() });            // if error error message display
    }

    try {
        // checking for the unique value of the email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ success, error: "sorry this exist already !!!!!" });
        }

        // generating a salt for secured password 
        const salt = await bcrypt.genSalt(10);
        // heshing a salt with the password 
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);

        success = true;
        res.json({ success, authtoken });
        // res.json(user);   //sending response

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }
})

//ROUTER 2 ============================================================================================
// authenticate a user using LOGIN "api/auth" dosent require path NO login require
router.post('/loginuser', [
    body('email', 'Enter a valid email type ').isEmail(),
    body('password', 'Password size must be greater then 5 ').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);                               //storing validation result in the errors
    if (!errors.isEmpty()) {                                            // if error is not empty means there is some error in it
        return res.status(404).json({ errors: errors.array() });         // if error error message display
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: " Wrong credential! enter correct email or password " });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(404).json({ success, error: " Wrong credential! enter correct email or password " });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error is occured");
    }
});

// router 3===========================================================================================
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("please authenticate using a valid user");
    }
});

module.exports = router 