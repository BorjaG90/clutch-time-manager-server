import { Op } from "sequelize";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.model";

module.exports = (passport) => {
  /** Config de estrategia local de passport ******/
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: false,
      },
      (username, password, done) => {
        console.log("[JWT] Ejecutando *callback verify* de estategia local");
        User.findOne({
          where: {
            [Op.and]: [
              { enabled: 1 },
              {
                [Op.or]: [{ email: username }, { username: username }],
              },
            ],
          },
        })
          .then((data) => {
            if (data === null) return done(null, false);
            //el usuario no existe
            else if (!bcrypt.compareSync(password, data.password)) {
              return done(null, false);
            } //no coincide la password
            return done(null, data); //login ok
          })
          .catch((err) => done(err, null)); // error en DB
      }
    )
  );

  /** Config de estrategia jwt de passport ******/
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;
  opts.algorithms = [process.env.JWT_ALGORITHM];

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log("ejecutando *callback verify* de estategia jwt");
      User.findOne({
        where: {
          [Op.and]: [{ enabled: 1 }, { id: jwt_payload.sub }],
        }
      })
        .then((data) => {
          if (data === null) {
            //no existe el usuario
            //podríamos registrar el usuario
            return done(null, false);
          } else return done(null, data);
          /*encontramos el usuario así que procedemos a devolverlo para
          inyectarlo en req.user de la petición en curso*/
        })
        .catch((err) => done(err, null)); //si hay un error lo devolvemos
    })
  );
};
