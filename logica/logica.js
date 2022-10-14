

// IMPORTANTE 


// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
	// .................................................................
	// nombreBD: Texto
	// -->
	// constructor () -->
	// .................................................................
	constructor(nombreBD, cb) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			(err) => {
				if (!err) {
					this.laConexion.run("PRAGMA foreign_keys = ON")
				}
				cb(err)
			})
	} // ()
	// .................................................................
	// nombreTabla:Texto
	// -->
	// borrarFilasDe() -->
	// .................................................................
	borrarFilasDe(tabla) {
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(
				"delete from " + tabla + ";",
				(err) => (err ? rechazar(err) : resolver())
			)
		})
	} // ()

	// .................................................................
	// datos:{dni:Texto, nombre:Texto: apellidos:Texto}
	// -->
	// insertarPersona() -->
	// .................................................................
	insertarMedicion(datos) {
		var textoSQL =
			"insert into Medicion values( $valor, $fecha, $lugar );"
		var valoresParaSQL = {
			$valor: datos.valor, $fecha: datos.fecha,
			$lugar: datos.lugar
		}
		// <//> <//> <//> <>/
		return new Promise((resolver, rechazar) => {
			this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()


	cerrar() {
		return new Promise((resolver, rechazar) => {
			this.laConexion.close((err) => {
				(err ? rechazar(err) : resolver())
			})
		})
	} // ()
} 
// class
// .....................................................................
// .....................................................................
