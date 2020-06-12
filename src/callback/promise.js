let XMLHttpRequest = require ('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

let traerDatos = (url_api) => {
		let xhttp = new XMLHttpRequest();
		return new Promise ((resolve, reject) => {
			xhttp.open ('GET', url_api, true);
			xhttp.onreadystatechange = () => {
				if (xhttp.readyState === 4) {
					if (xhttp.status === 200) {
						resolve (xhttp.responseText);
					} else {
						reject (xhttp.statusText);
					};
				};
			};
			xhttp.send ();
		});
	};

traerDatos (API).then (datos => {
	let datosProcesados = JSON.parse (datos);
	console.info (datosProcesados.info.count);
	return traerDatos (API + datosProcesados.results[0].id);
}).then (results => {
	let datosProcesados = JSON.parse (results);
	console.info (datosProcesados.name);
	return traerDatos (datosProcesados.origin.url);
}).then (origin => {
	let datosProcesados = JSON.parse (origin);
	console.info (datosProcesados.dimension);
}).catch (error => {
	console.error (error);
});
