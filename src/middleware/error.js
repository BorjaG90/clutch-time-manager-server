"use strict";
const errorTypes = require("../controllers/errorTypes");

module.exports = {
  /*
    Este middleware va al final de todos los middleware y rutas.
    middleware de manejo de errores.
    */
  errorHandler: (error, req, res, next) => {
    console.log("ejecutando middleware de control de errores");
    if (error instanceof errorTypes.InfoError)
      res.status(200).json({ error: error.message });
    else if (error instanceof errorTypes.Error404)
      res.status(404).json({ error: error.message });
    else if (error instanceof errorTypes.Error403)
      res.status(403).json({ error: error.message });
    else if (error instanceof errorTypes.Error401)
      res.status(401).json({ error: error.message });
    else if (error.name == "ValidationError")
      //de mongoose
      res.status(200).json({ error: error.message });
    else if (error.message) res.status(500).json({ error: error.message });
    else next();
  },

  /*
    Este middleware va al final de todos los middleware y rutas.
    middleware para manejar notFound
    */
  notFoundHandler: (req, res, next) => {
    console.log(
      "[ERR] Ejecutando middleware para manejo de endpoints no encontrados"
    );
    res.status(404).json({ error: "endpoint not found" });
  }
};
