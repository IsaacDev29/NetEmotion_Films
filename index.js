

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

async function obtenerPeliculaPorID(id) {
    try {
      const url = `https://www.freetestapi.com/api/v1/movies/${id}`;
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error(`Error: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      console.log('Pelicula:', datos);
    } catch (error) {
      console.error(`Error al obtener la película con ID ${id}:`, error.message);
    }
}
// peliculas de la cartelera1
async function cargarPeliculasCartelera1() {
    try {
      const API_URL = 'https://www.freetestapi.com/api/v1/movies?limit=3';
      const listaCartelera = document.querySelector('.filaCartelera');
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error('Error al obtener las películas');
      const peliculas = await respuesta.json();
    
      listaCartelera.innerHTML = '';

      peliculas.forEach((pelicula) => {
        const peliculaHTML = `
          <div class="col-lg-4 columnaTarjeta">
            <div class="card tarjeta" style="width: 18rem;">
              <img src="https://fakeimg.pl/300x150" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${pelicula.title}</h5>
                <p class="card-text">Director: ${pelicula.director}</p>
                <p class="card-text">Año: ${pelicula.year}</p>
                <p class="card-text">Rating: ${pelicula.rating}</p>
              </div>
            </div>
          </div>
        `;
        listaCartelera.innerHTML += peliculaHTML;
      });
    } catch (error) {
      console.error('Error al cargar películas:', error.message);
    }
}
// peliculas de la cartelera 2
async function cargarPeliculasCartelera2() {
  try {
    const API_URL = 'https://www.freetestapi.com/api/v1/movies?limit=9';
    const listaCartelera = document.querySelector('.cartelera2');
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener las películas');
    const peliculas = await respuesta.json();
  
    listaCartelera.innerHTML = '';

    peliculas.forEach((pelicula) => {
      const peliculaHTML = `
        <div class="col-lg-4 columnaTarjeta">
          <div class="card tarjeta" style="width: 18rem;">
            <img src="https://fakeimg.pl/300x150" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${pelicula.title}</h5>
              <p class="card-text">Director: ${pelicula.director}</p>
              <p class="card-text">Año: ${pelicula.year}</p>
              <p class="card-text">Rating: ${pelicula.rating}</p>
            </div>
          </div>
        </div>
      `;
      listaCartelera.innerHTML += peliculaHTML;
    });
  } catch (error) {
    console.error('Error al cargar películas:', error.message);
  }
}
// peliculas de la categoria
async function cargarPeliculasGenero() {
  try {
    const API_URL = 'https://www.freetestapi.com/api/v1/movies?limit=3';
    const listaCartelera = document.querySelector('.categorias');
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener las películas');
    const peliculas = await respuesta.json();
  
    listaCartelera.innerHTML = '';

    peliculas.forEach((pelicula) => {
      const peliculaHTML = `
        <div class="col-lg-4 columnaTarjeta">
          <div class="card tarjeta" style="width: 18rem;">
            <img src="https://fakeimg.pl/300x150" class="card-img-top">
            <div class="card-body">
              <h4 class="card-text">Titulo: ${pelicula.title}</h4>
              <p class="card-text">Año: ${pelicula.year}</p>
              <p class="card-text">Rating: ${pelicula.rating}</p>
            </div>
          </div>
        </div>
      `;
      listaCartelera.innerHTML += peliculaHTML;
    });
  } catch (error) {
    console.error('Error al cargar películas:', error.message);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  cargarPeliculasCartelera1();
  cargarPeliculasCartelera2();
  cargarPeliculasGenero();
});
  