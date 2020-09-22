import { json } from "express";
import User from "../models/User.model";

export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get users",
      data: {},
    });
  }
}

export async function createUser(req, res) {
  try {
    const { email, name, password } = req.body;
    let newUser = await User.create(
      {
        email,
        password,
        name,
      },
      {
        fields: ["email", "password", "name"],
      }
    );
    if (newUser) {
      return res.json({
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "User not created, something goes wrong",
      data: {},
    });
  }
}

export async function getOneUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    res.json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot get that user",
      data: {},
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const deleteRowCount = await User.destroy({
      where: { id },
    });
    res.json({
      message: 'User deleted succesfully',
      count: deleteRowCount
    })
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete that user",
      data: {},
    });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'password'],
      where: { id }
    });

    if (users.length > 0){
      users.map(async user => {
        await user.update({
          email,
          password,
          name
        });
      });
    }

    return res.json({
      message: 'Users updated succesfully',
      data: users
    })
  } catch (error) {
    res.status(500).json({
      message: "Cannot update that user",
      data: {},
    });
  }
}