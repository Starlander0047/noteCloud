const express = require('express');
const { body, validationResult, matchedData } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "IamAboy";

const router = express.Router();

//Route-1]Creating a user using post: "api/auth/createuser", No login required
router.post("/createuser",[
    body('name','Name should have atleast 3 characters').isLength({min: 3}),
    body('email',"Email should be valid").isEmail(),
    body('password','Password should have atleast 5 characters').isLength({min: 5})
 ], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    const data = matchedData(req)

    
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
        
        //checking if user with this email already exists
        let user = await User.findOne({email: data.email})
        if(user)
        {
            return res.status(400).json({ success, error: "This email is already used!"})
        }
        //Hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(data.password, salt)
        //Storing
        user = await User.create({
            name: data.name,
            email: data.email,
            password: secPass
        })
        //Giving a JWT token
        const data_jwt = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data_jwt, JWT_SECRET);
        success = true;
        res.json({ success ,authToken});

    } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
        
    // const user = User(req.body)
    // user.save(); // we used this to send data to mongodb without using express validator
})

//Route-2]Authenticating a user using post: "api/auth/login", No login required
router.post("/login",[
    body('email',"Email should be valid").isEmail(),
    body('password','Please enter a password').exists()
 ], async (req,res)=>{
    let success=false //this becomes true if the user is authentic
    const errors = validationResult(req);
    const data = matchedData(req)
    //Validation of the data
    if(!errors.isEmpty())
    {
        return res.status(400).json({ success, errors: errors.array() })
    }

    const {email, password} = data;
    try {
        //Confirming the email
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({ success, error: "Please enter the correct credentials"})
        }
        //Confirming the password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({ success, error: "Please enter the correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success ,authToken});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route-3]Get user details using post: "api/auth/getuser", Login required
router.get("/getuser", fetchuser, async (req,res)=>{
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;