//const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es requerido"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "El email es requerido"],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contraseña es requerida"],
	},
	rol: {
		type: String,
		default: "usuario",
		enum: ["usuario", "profesor", "admin"],
	},
});

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(12);
	return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
