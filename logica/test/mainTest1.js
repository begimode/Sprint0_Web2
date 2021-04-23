
// --------------------------------------------------------------------------------
// mainTest1.js
// --------------------------------------------------------------------------------
const logica = require( "../logica.js" )

var assert = require ('assert')

// --------------------------------------------------------------------------------
// main ()
// --------------------------------------------------------------------------------
describe( "Test 1: insertar una persona", function() {

	var laLogica = null

	// 
	// 1.
	//
	it ( "cargo la lógica abriendo conexión ", async function() {

		laLogica = await logica( "../bd/datos.bd" )

	})

	// 
	// 2.
	//
	it( "borro todas las filas", async function() {

		await laLogica.funciones.borrarFilasDeTodasLasTablas.f() 
		
	}) // it

	// 
	// 3.
	//
	it( "inserto una persona", async function() {

		await laLogica.funciones.insertarPersona.f(
			{dni: "1234A", nombre: "Pepe", apellidos: "García Pérez" } )
			
		var res = await laLogica.funciones.buscarPersonaConDNI.f( "1234A" )
			
		assert.equal( res.length, 1, "¿no hay un resulado?" )
		assert.equal( res[0].dni, "1234A", "¿no es 1234A?" )
		assert.equal( res[0].nombre, "Pepe", "¿no es Pepe?" )
		
	}) // it

	// 
	// 4.
	//
	it( "cierro conexion con base de datos", async function() {

			await laLogica.funciones.cerrarConexion.f()

	}) // it

}) // describe

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
