let XMLHttpRequest = require ('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

function traerDatos (url_api, callback) {
	let xhttp = new XMLHttpRequest();
	// Con true activamos el asincronismo en la llamada
	xhttp.open('GET', url_api, true);

	xhttp.onreadystatechange = function (evento) {
		// validamos para ver si ejecutamos callback o no
		// hay diferentes estados. El estado 4 es que ha sido completado el request
		if (xhttp.readyState === 4) {
			// validamos si es correcta la petición del servidor
			if (xhttp.status === 200) {
				// ahora si todo es correcto
				// procesamos el JSON y lo mandamos a través del callback
				callback (null, JSON.parse (xhttp.responseText));
			} else {
				// si algo sale mal, mandamos un error con nuestro callback
				const error = new Error ('Error' + url_api);
				return callback (error, null);
			}
		}
	}
	// Utilizamos el método send
	xhttp.send ();
}

traerDatos (API, function (err, data) {
	if (err) return console.error (err);
	traerDatos (API + data.results[0].id, function (err2, data2) {
		if (err2) return console.error (err2);
		traerDatos (data2.origin.url, function (err3, data3) {
			if (err3) return console.error (err3);

			console.info (data.info.count);
			console.info (data2.name);
			console.info (data3.dimension);
		});
	});
});
