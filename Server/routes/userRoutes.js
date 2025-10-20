const express = require("express");
const router = express.Router();
const UserModel = require('../models/User.js')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv')
dotenv.config()

router.get('/get-users', async(req, res)=>{
  try{
    const users = await UserModel.find({});
    res.status(200).json(users);
  }catch(err){
    res.status(400).json("couldn't fetch users")
  }
})

router.post('/add-money', async (req, res) => {
  const { userId, money } = req.body;

  try {
    // Ensure the money is correctly parsed as a number
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $inc: { wallet: +money } }, // Increment money value
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(400).json("Update failed");
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body

  try {
      const user = await UserModel.findOne({username: username})

      if(user)
      {
          const validity = await bcrypt.compare(password, user.password)

          if(validity)
          {
            const token = jwt.sign(
              { id: user._id, username: user.username }, // Payload
              process.env.JWT_SECRET, // Secret key
              { expiresIn: '1h' } // Token expires in 1 hour
            );
            res.status(200).json({user, token})
          }else{
            res.status(400).json("Password is Incorrect")
          }
          
      }
      else{
          res.status(404).json("User does not exists")
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username: username,
      email: email,
      password: hashedPass,
    });

    try {
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
module.exports = router;
