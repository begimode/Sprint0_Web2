// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

var cors  = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')

const Logica = require("../logica/logica.js")
const { assert } = require('console')


// --------------------------------------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {

	// .......................................................
	// Reglas del API REST
	// .......................................................

	servidorExpress.post("/insertarMedicion", async function (peticion, respuesta) {
		var error=null;	
		try{
				console.log(" * POST /insertarMedicion")
			var datos = JSON.parse(peticion.body)
			console.log(datos.valor)
			console.log(datos.fecha)
			console.log(datos.lugar)

			await laLogica.insertarMedicion(datos); 
			respuesta.send("OK");
			}catch(err){
				err= error
			}
		}) 
}
// () 

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
function main() {

	//  cargo logica abriendo conexión
	var laLogica = null

	laLogica = new Logica("../bd/datos.bd", function (err) {
		if (err) {
			throw new Error("No he podido conectar con datos.db")
		}
	})
	// creo el servidor
	var servidorExpress = express()

	servidorExpress.use(cors())
	
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	servidorExpress.use(bodyParser.text({ type: 'application/json' }))

	// Me ha dado problemas: servidorExpress.use( express.json() )
	// cargo las reglas REST 
	cargarReglasUniversales(servidorExpress, laLogica)

	servidorExpress.use(express.static("../ux"))

	//  
	// arranco el servidor
	//  
	var servicio = servidorExpress.listen(8080, function () {
		console.log("servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html ")
	})

	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function () {
		console.log(" terminando ")
		servicio.close()
	})
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
