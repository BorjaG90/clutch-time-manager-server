import { json } from 'express';
import User from '../models/User.model';

export async function getUsers(req, res) {
  const users = await User.findAll();
  res.json({
    data: users
  });
};

export async function createUser(req, res) {
  const {email, name, password} = req.body;
  try {
    let newUser = await User.create({
      email,
      password,
      name
    }, {
      fields: ['email', 'password', 'name']
    });
    if (newUser) {
      return res.json({
        message: 'User created successfully',
        data: newUser
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'User not created, something goes wrong',
      data: {}
    });
  };
};