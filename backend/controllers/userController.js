const express = require('express');
const   router = express.Router();
const UserService = require('../services/userService');
const UserRepository = require('../repositories/userRepository');

const userRepo = new UserRepository();
const userService = new UserService(userRepo)

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userService.createUser(username, email, password);
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
    console.log(email);
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
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
