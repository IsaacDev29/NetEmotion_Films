async function obtenerPeliculaPorID(id) {
  try {
    const url = `https://www.freetestapi.com/api/v1/movies/${id}`;
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    const datos = await respuesta.json();

    const titulo = document.getElementById('tituloPelicula');
    const descripcion = document.getElementById('descripcionPelicula');
    const director = document.getElementById('directorPelicula');
    const nominacion = document.getElementById('premiosPelicula');

    titulo.textContent = datos.title;
    descripcion.textContent = datos.plot;
    director.textContent = datos.director;
    nominacion.textContent = datos.awards;

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
              <p class="card-text">${pelicula.genre}</p>
              <p class="card-text">Premios: ${pelicula.awards}</p>
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

async function buscarPeliculas(event) {
  event.preventDefault(); // Evita que el formulario recargue la página

  const termino = document.getElementById('inputBusqueda').value.trim().toLowerCase();
  if (!termino) {
    alert('Por favor, ingresa un término para buscar.');
    return;
  }

  const contenedorResultados = document.querySelector('#resultadosBusqueda .filaResultados');
  contenedorResultados.innerHTML = '<p>Cargando...</p>'; // Mensaje mientras busca

  try {
    const API_URL = `https://www.freetestapi.com/api/v1/movies`; // Obtiene TODAS las películas
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error(`Error en API: ${respuesta.status}`);

    const peliculas = await respuesta.json();
    console.log("Películas obtenidas de la API:", peliculas); // Debug: Ver si llegan datos

    // Filtrar resultados
    const peliculasFiltradas = peliculas.filter((pelicula) =>
      (pelicula.title && pelicula.title.toLowerCase().includes(termino)) ||
      (pelicula.year && pelicula.year.toString().includes(termino)) ||
      (pelicula.genre && typeof pelicula.genre === 'string' && pelicula.genre.toLowerCase().includes(termino)) ||
      (pelicula.director && typeof pelicula.director === 'string' && pelicula.director.toLowerCase().includes(termino))
    );

    console.log("Películas filtradas:", peliculasFiltradas); // Debug: Ver cuántas películas coinciden

    // Si no hay resultados, mostrar mensaje
    if (peliculasFiltradas.length === 0) {
      contenedorResultados.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    // Limitar a solo 3 resultados
    const resultadosLimitados = peliculasFiltradas.slice(0, 3);

    // Mostrar resultados
    mostrarResultadosBusqueda(resultadosLimitados);
  } catch (error) {
    console.error('Error en la búsqueda:', error.message);
    contenedorResultados.innerHTML = `<p>Error al cargar los resultados: ${error.message}</p>`;
  }
}


function mostrarResultadosBusqueda(peliculas) {
  const contenedorResultados = document.querySelector('#resultadosBusqueda .filaResultados');
  contenedorResultados.innerHTML = ''; // Limpia los resultados previos

  if (peliculas.length === 0) {
    contenedorResultados.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  peliculas.forEach((pelicula) => {
    const peliculaHTML = `
      <div class="col-lg-4 columnaTarjeta">
        <div class="card tarjeta" style="width: 18rem;">
          <img src="https://fakeimg.pl/300x150" class="card-img-top" alt="${pelicula.title}">
          <div class="card-body">
            <h5 class="card-title">${pelicula.title || 'Título no disponible'}</h5>
            <p class="card-text">Director: ${pelicula.director || 'Desconocido'}</p>
            <p class="card-text">Año: ${pelicula.year || 'N/A'}</p>
            <p class="card-text">Género: ${pelicula.genre || 'N/A'}</p>
            <p class="card-text">Rating: ${pelicula.rating || 'N/A'}</p>
          </div>
        </div>
      </div>
    `;
    contenedorResultados.innerHTML += peliculaHTML;
  });
}



document.addEventListener('DOMContentLoaded', () => {
  cargarPeliculasCartelera1();
  cargarPeliculasCartelera2();
  cargarPeliculasGenero();
  obtenerPeliculaPorID(15);
});
