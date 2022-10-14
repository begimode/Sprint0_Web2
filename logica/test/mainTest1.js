/*
// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 1: insertar una persona", function () {
	// ....................................................
	// ....................................................
	var laLogica = null
	// ....................................................
	// ....................................................
	it("conectar a la base de datos", function (hecho) {  // la prueba concreta, el cual tiene su tittulo y un callback con una funcion con cualquier nombre. 
		laLogica = new Logica(  // crear un objeto --> 
			"../bd/datos.bd",
			function (err) {
				if (err) {
					throw new Error("No he podido conectar con datos.db")
				}
				hecho()
			})
	}) // it
	// ....................................................
	// ....................................................
	it("borrar todas las filas", async function () {
		await laLogica.borrarFilasDeTodasLasTablas()  
	}) 
	
	// it
	// ....................................................
	// ....................................................

	it("puedo insertar una persona",
		async function () {
			try {

			await laLogica.insertarPersona(
				{
					dni: "1234A", nombre: "Pepe",
					apellidos: "García Pérez"
				})
			var res = await laLogica.buscarPersonaConDNI("1234A")
			assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].dni, "1234A", "¿no es 1234A?")
			assert.equal(res[0].nombre, "Pepe", "¿no es Pepe?")  // el assert es un if 

		} catch (error) {
			error= err; 
		}
				
	
	// it
	// ....................................................
	// ....................................................

	it("no puedo insertar una persona con dni que ya está",
		async function () {
			var error = null
			try {
				await laLogica.insertarPersona(
					{
						dni: "1234A", nombre: "Pepa",
						apellidos: "Pérez Pérez"
					})
			} catch (err) {
				error = err
			}
			assert(error, "¿Ha insertado el dni que ya estaba 1234A? (¿No ha pasado por el catch()?")
		}) // it
	// ....................................................
	// ....................................................
	it("cerrar conexión a la base de datos",
		async function () {
			try {
				await laLogica.cerrar()
			} catch (err) {
				// assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
				throw new Error("cerrar conexión a BD fallada: " + err)
			}
		}) // it
	
	
})

})

*/