//Rutas producto
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//api/usuario

// crear usuario
router.post("/create-user", userController.crearUsuario);

// obtener datos
router.get("/", userController.obtenerUsuarios);
router.get("/:id", userController.obtenerUsuario);

// actualizar usuario

// eliminar usuario

// authenticate
router.post("/login", userController.loginUsuario);

module.exports = router;
