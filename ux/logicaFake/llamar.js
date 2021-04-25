// ---------------------------------------------------
//
// llama a una función remota enviando GET <nombreFuncion>
//
// ---------------------------------------------------
function llamar( nombreFuncion, parametrosLlamada, cb ) {

	// preparar la llamada remota
	var xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function() {
		// callback para cuando llegue la respuesta
		// de la petición que haremos más abajo

		if( this.readyState == 4 && this.status == 200 ){

			// este es el texto JSON recibido la llamada a
			// demo_file.php, pasado a objeto JSON 
			console.log( "recibo: " + this.responseText )
			
			var resultado = null

			try {
				resultado = JSON.parse(this.responseText)
				
				if ( resultado.error != null ) {
					cb( resultado.error, null )
					return
				}

				// no hay error, devuelvo el resultado
				cb( null, resultado ) 
				
			} catch( error )  {
				cb( error, null )
			}

		} // if( this.readyState == 4 && this.status == 200 ){
	} //  xmlhttp.onreadystatechange = function() {
	
	// llamamos *remotamente* 
	// (la verdadera función de la lógica)
	xmlhttp.open("POST", nombreFuncion, true)
	xmlhttp.send( parametrosLlamada )

} // ()
