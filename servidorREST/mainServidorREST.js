// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

const express = require( 'express' ) 
const bodyParser = require( 'body-parser' )

const logica = require( "../logica/logica.js" )

// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
// 
//  ---------------------------
//  GET /nombreFuncionLogica
// 
//  datos en JSON en el cuerpo
//  ---------------------------
// 
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
// 
// --------------------------------------------------------------------------------
function cargarReglasUniversales( servidorExpress, laLogica ) {

    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba', function( peticion, respuesta ){
		console.log( " * GET /prueba " )
		respuesta.send( "¡Funciona!" )
	}) // get /prueba
	
    // .......................................................
    // POST /f/<nombreFuncion>
    // .......................................................
    servidorExpress.post( '/f/:funcion',
		async function( peticion, respuesta ){
			// averiguo el nombre de la función
			var nombreFuncion = peticion.params.funcion

			// aviso
			console.log( " * POST /f/ " + nombreFuncion )

			//
			// llamo a la función adecuada de la lógica
			//
			try {

				var argumentos = null
				
				// obtengo argumentos del cuerpo
				try {
					argumentos = JSON.parse( peticion.body )
				} catch( error ) {
					// ignoro errores, por si no hay body
				}

				// esta es la llamada
				var res = await laLogica.f( nombreFuncion, argumentos )

				// esta es el envío de la respuesta de la llamada
				respuesta.send( JSON.stringify( res ) )

			} catch( error ) {
				// el número 404 (NOT FOUND) usado para cualquier error, no
				// es una idea perfecta
				respuesta.status(404).send( "Se produjo este error: " + error )
			}

		}) // get /persona
} // ()

// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
async function main() {

	//  
	//  cargo logica abriendo conexión
	//  
	var laLogica = await logica( "../bd/datos.bd" )

	//  
	// creo el servidor
	//  
	var servidorExpress = express()

	//  
	// para poder acceder a la carga de la petición http
	// (asumiendo que es JSON) hay que hacer esto:
	//  
	servidorExpress.use ( bodyParser.text({type: 'application/json'}) )

	//  
	// cargo las reglas REST
	//  
	cargarReglasUniversales( servidorExpress, laLogica )


	//  
	// arranco el servidor
	//  
	var servicio = servidorExpress.listen( 8080, function() {
		console.log( "servidor REST escuchando en el puerto 8080 ")
	})

	//  
	// capturo control-c para cerrar el servicio ordenadamente
	//  
	process.on('SIGINT', function() {
        console.log (" terminando ")
        servicio.close ()
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
