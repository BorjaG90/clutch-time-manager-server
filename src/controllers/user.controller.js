import { Op, literal } from "sequelize";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";

import User from "../models/User.model";
import { errorTypes } from "./errorTypes";

export async function register(req, res, next) {
  try {
    let user = await User.findOne({
      where: {
        [Op.and]: [
          { active: true },
          {
            [Op.or]: [
              { email: req.body.email },
              { username: req.body.username },
            ],
          },
        ],
      },
    });

    if (user) {
      //si el email o el usuario existe
      throw new errorTypes.InfoError("email or username already used");
    } else {
      //si no existe el usuario se crea/registra
      // console.log("creando usuario");
      var hash = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.BCRYPT_ROUNDS)
      );
      let newUser = await User.create(
        {
          email: req.body.email,
          password: hash,
          username: req.body.username,
          firstname: req.body.firstname || "",
          lastname: req.body.lastname || "",
          active: true,
          is_admin: false,
          created_at: literal('CURRENT_TIMESTAMP')
        },
        {
          fields: [
            "email",
            "password",
            "username",
            "firstname",
            "lastname",
            "active",
            "is_admin",
            "created_at"
          ],
        }
      );
      if (newUser) {
        return res.json({
          message: "User created successfully",
          data: newUser,
        });
      }else{
        next(new errorTypes.Error403("User not created, something goes wrong"));
      }
    }
  } catch (error) {
    // error en registro, lo pasamos al manejador de errores
    next(error);
  }
}

export async function login(req, res, next) {
  passport.authenticate("local", { session: false }, (error, user) => {
    console.log(
      "[AUTH] ejecutando *callback auth* de authenticate para estrategia local"
    );

    //si hubo un error en el callback verify relacionado con la consulta de datos de usuario
    if (error || !user) {
      console.log(`ERR: ${error}`);
      next(new errorTypes.Error404("username or password not correct."));
    } else {
      console.log("[AUTH] *****comienza generacion token*****");
      const payload = {
        sub: user.id,
        exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
        username: user.username,
      };

      /* NOTA: Si estuviesemos usando sesiones, al usar un callback personalizado, 
        es nuestra responsabilidad crear la sesión.
        Por lo que deberiamos llamar a req.logIn(user, (error)=>{}) aquí*/

      /*solo inficamos el payload ya que el header ya lo crea 
        la lib jsonwebtoken internamente para el calculo de la firma 
        y así obtener el token*/
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
      });
      res.json({ data: { token: token } });
    }
  })(req, res);
}

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
      message: "User deleted succesfully",
      count: deleteRowCount,
    });
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
      attributes: ["id", "email", "name", "password"],
      where: { id },
    });

    if (users.length > 0) {
      users.map(async (user) => {
        await user.update({
          email,
          password,
          name,
        });
      });
    }

    return res.json({
      message: "Users updated succesfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot update that user",
      data: {},
    });
  }
}
