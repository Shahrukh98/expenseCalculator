const express = require('express');
const   router = express.Router();
const UserService = require('../services/userService');
const UserRepository = require('../repositories/userRepository');

const userRepo = new UserRepository();
const userService = new UserService(userRepo)

router.post('/register', async (req, res) => {
  const { username, nickname, email, password } = req.body;
  try {
    const newUser = await userService.createUser(username, nickname, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    if (error?.code == "23505"){
      return res.status(400).json({ error: 'Email Already Registered!' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    if(error?.message == 'Invalid Credentials!'){
      return res.status(400).json({error: error?.message});
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
