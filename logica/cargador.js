// --------------------------------------------------------------------------------
// cargador.js
// --------------------------------------------------------------------------------
// 
// Carga los objetos-función que hayab en un directorio dado.
// Cada objeto debe tener un campo 'conexion' y una función llamada 'f()', que
// pueda depender de 'conexion'.
// Al cargarlo, inyecta el valor dependencia en 'conexion'
// Devuelve un objeto que contiene la lista de funciones cargadas y, expecialmente,
// una función f() para llamar a alguna de las funciones por su nombre pasándole
// los argumentos, y detectar si la llamada no ha funcionado.
//
// --------------------------------------------------------------------------------

const fs = require( 'fs' )

// --------------------------------------------------------------------------------
//
// nombreDir: Texto
// dependencia: TDep
//                 -->
//                    cargador()
//                 <--
// { 
//   f: ( Texto, TArg -> () -> TRes ),
//   funciones: [ { conexion: TDep, f: TArg -> () -> TRes } ]_Texto // array asociativo
// }
//
// --------------------------------------------------------------------------------
module.exports = function( nombreDir, dependencia ) {
	var logica = {
		funciones: {}, 
		f: async function( nombreFuncion, args ) {
			// busco la funcion por su nombre
			var laFuncion = this.funciones[ nombreFuncion ]

			// compruebo que existe
			if ( laFuncion == null ) {
				throw ("Funcion no encontrada: " + nombreFuncion)
			}

			// llamo la función
			return laFuncion.f( args )
		} // f()
	} // logica

	// busco los ficheros que hay en nombreDir,
	// los cargo con require
	// les inyecto la dependencia
	// y los guardo
	fs.readdirSync( nombreDir ).forEach( function( fich ) {
		console.log( "cargando: " + fich )
		var obj = require( nombreDir + "/" + fich )
		obj.conexion = dependencia
		logica.funciones[ fich ] = obj
	})

	// devuelvo el resultado
	return logica
} // ()

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
