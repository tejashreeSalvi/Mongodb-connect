const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Get Data..
router.get("/", async(req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//Submit Data.. 
router.post("/", async(req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  const userData = await user.save();
  console.log(userData);
  res.status(200).json({
    msg: userData
  });
});

//Delete specific data..
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.remove({
      _id: req.params.id  
    }); 
    res.json(removedUser);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//update specific data..
router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({
      _id: req.params.id
    }, { $set: { firstName: req.body.firstName}});
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: err
    });
  } 
});

//get data by id..
router.get('/:id', async (req, res) => {
  try {
    const userDataById = await User.findById(req.params.id);
    res.json(userDataById);
  } catch (err) {
    res.json({
      message: err
    })
  }
});

module.exports = router;