/**
 * Práctica 15
 * Promesas API
 * Brian Passos
 */
'use strict';

let XMLHttpRequest = require ('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

let traerDatos = (url_api) => { // Función que incluirá la promesa
		let xhttp = new XMLHttpRequest (); // Variable con la instancia que usaremos para las peticiones
		return new Promise ((resolve, reject) => { // Promesa
			xhttp.open ('GET', url_api, true); // Hacemos la petición con el método GET a la url dada y de forma asíncrona
			xhttp.onreadystatechange = () => { // Evento que se ejecuta cuando el estado de la petición cambia
				if (xhttp.readyState === 4) { // Si el estado de dicha petición se ha completado
					if (xhttp.status === 200) { // Y el código de estado de ésta es 200 (OK/Correcta)
						resolve (JSON.parse (xhttp.responseText)); // Procesamos la respuesta
					} else {
						reject (xhttp.statusText); // En caso contrario denegamos el procesamiento y devolvemos la razón
					};
				};
			};
			xhttp.send (); // Enviamos la petición
		});
	};

traerDatos (API) // Primera llamada a la función con promesa
.then (datos => { // Procesamos la respuesta obtenida
	console.info (datos.info.count); // Mostramos en consola la cantidad de personajes en la API de rickandmorty
	return traerDatos (API + datos.results[0].id); // Ejecutamos y pasamos la siguiente llamada a la API
}).then (results => { // Procesamos la respuesta de la segunda llamada
	console.info (results.name); // Mostramos en consola el nombre del primer personaje en la API
	return traerDatos (results.origin.url); // Ejecutamos y pasamos la tercer y última llamada
}).then (origin => { // Procesamos la respuesta de ésta última llamada
	console.info (origin.dimension); // Mostramos en consola el nombre de la dimensión del personaje
}).catch (error => {
	console.error (error); // Si ocurre algún error en nuestra cadena de llamadas, mostramos la razón en consola.
});
