const express = require("express");
const conectarDB = require("./config/db");
const config = require("./config/global");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const cors = require("cors");
const multer = require("multer");

const app = express();

//Conectar BD
conectarDB();

app.use(cors());

// Configuración de middleware para la carga de archivos
const multiPartMiddleware = multipart();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./imagenes"); // Directorio donde se guardarán las imágenes
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo con un timestamp para evitar conflictos
	},
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// ROUTES

app.use(express.json());

app.use("/api/productos", require("./routes/producto"));

// rutas de usuarios
app.use("/api/usuarios", require("./routes/usuario"));

// opcional
app.use("/api/generate-pdf", require("./routes/pdf"));

app.listen(config.port, () => {
	console.log("El servidor por el puerto 4000");
});
