async function obtenerPeliculas(){
    try {
        const url = 'https://www.freetestapi.com/api/v1/movies';
        const respuesta = await fetch(url);
        if (!respuesta.ok){
            throw new Error(`Error: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log('Peliculas:', datos);
    }catch (error){
        console.error('Error al obtener películas:', error.message);
    }
}
