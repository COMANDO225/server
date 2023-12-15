const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config/global");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.obtenerUsuarios = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.crearUsuario = async (req, res) => {
	const { nombre, email, password, rol } = req.body;

	try {
		const matchEmail = await User.findOne({ email });

		if (matchEmail) res.status(400).json({ message: "El email ya existe" });

		const newUser = new User({
			nombre,
			email,
			password,
			rol,
		});

		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();

		const token = jwt.sign({ id: newUser._id }, config.secret, {
			expiresIn: 60 * 60 * 24,
		});
		res.json({ auth: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.obtenerUsuario = async (req, res) => {
	const { id } = req.params;

	try {
		const objectId = new ObjectId(id);
		const matchUserId = await User.findById(objectId);

		if (!matchUserId)
			res.status(400).json({ message: "El usuario no existe" });

		res.status(200).json({
			user: matchUserId,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.loginUsuario = async (req, res) => {
	try {
		const { email, password } = req.body;

		// voy a validar que exista el usaurio
		const userExists = await User.findOne({ email });

		if (!userExists) {
			return res.status(400).json({ message: "El usuario no existe" });
		}

		// validar password
		const validPasword = await userExists.validatePassword(password);

		if (!validPasword) {
			return res.status(400).json({ message: "Password incorrecto" });
		}

		// creamos nuestro rico y suculento token masna
		const token = jwt.sign({ id: userExists._id }, config.secret, {
			expiresIn: "30d",
		});
		res.json({ auth: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error papixulo");
	}
};
