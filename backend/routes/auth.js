const express = require('express')
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'IamAGoodBoy'
//  Route1 : create a user : POST "/api/auth/createuser".  No login required..
// router.get('/', (req,res) => {   //  this is for getting request..
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:8})
], async (req,res) => {     //  this is for posting request..
    let success = false
    let esuccess = false
    // if there are errors, return bad requests and the errors..
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, esuccess, errors: errors.array()});
    }

    // check whether the user with the same email exists already...
    try {

        let user = await User.findOne({email: req.body.email})
        if(user){
            esuccess = true;
            return res.status(400).json({success, esuccess, error: "Sorry user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        //  create a new user..
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // .then(user => res.json(user))
        // .catch(err => {
        //     res.json({Error: 'please enter unique value', message: err.message})
        // })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})
        // res.json(user)
    } catch (error) {
        res.status(400).send("Internal Server Error ")
    }
})


//  Route2 : authenticate a user : POST "/api/auth/login".  No login required..
router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:8})
], async (req,res) => { 

    let success = false;
    let esuccess = false;
     // if there are errors, return bad requests and the errors..
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({success, esuccess, errors: errors.array()});
     }

     const {email, password} = req.body;
     try {
        
        let user = await User.findOne({email})
        if(!user){
            esuccess = true
            return res.status(400).json({success, esuccess, error: 'Please try to login with correct email or phone'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            esuccess = true
            return res.status(400).json({success, esuccess, error: 'Please enter the right password'})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})

     } catch (error) {
        res.status(400).send("Internal Server Error")
    }
})

//  Route3 : Get logdin user details: POST "/api/auth/getuser".  login required..
router.post('/getuser', fetchuser, async (req,res) => { 
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(400).send("Internal Server Error")
    }
})

module.exports = router