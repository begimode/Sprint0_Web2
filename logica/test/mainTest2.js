// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js")
var assert = require("assert")
// ........................................................
// main ()
// ........................................................

// es donde empieza la prueba del test 

describe("Test 1: insertar una asignatura", function () {
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

	it("puedo insertar una asignatura",
		async function () {
			try {

			await laLogica.altaAsignatura(
				{
					codigo: "12344345", asignatura: "jiji",
				})
			var res = await laLogica.consultarAsignatura("12344345")
			assert.equal(res.length, 1, "¿no hay un resulado?")  // -->  (a, b, c) -> if (a!=b) --> return c 
			assert.equal(res[0].codigo, "12344345", "¿no es 12344345?")
			assert.equal(res[0].asignatura, "jiji", "¿no es jiji")  // el assert es un if 

		} catch (err) {
			error= err; 
		}
				
	
	// it
	// ....................................................
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