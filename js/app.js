//generarid
//obtenergeneros
//poblargeneros
//aplicarfiltros
//marcarfavorito
//marcardisponible
//eliminarlibro
//agregar libro nuevo
function generarId(){
    return libros.lenght > 0 ? Math.max(...libros.map(libro => libro.id)) + 1: 1;
}
function obtenerGeneros () {
    return [...new Set(libros.map(libro => libro.genero))].sort();
}

function poblarGeneros() {
    const select = document.getElementById('filtro-genero');
    const generoActual = select.value;

    select.innerHTML = '<option value="todos">Todos</option>';
    obtenerGeneros().forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        select.appendChild(option);
    });
    if([...select.options].some(option => option.value ===generoActual)){
        select.value=generoActual;
    }
}
function aplicarFiltros(){
    const busqueda = document.getElementById('buscar').value.trim().toLowerCase();
    const generoSeleccionado = document.getElementById('filtro-genero').value;
    const soloFavoritos = document.getElementById('mostrarFavoritos').checked;

    const librosFiltrados = libros.filter(libro => {
        const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda) || libro.autor.toLowerCase().includes(busqueda);
        const coincideGenero = generoSeleccionado ==='todos' || libro.genero ===generoSeleccionado;
        const coincideFavorito = !soloFavoritos || libro.favorito;
        return coincideBusqueda && coincideGenero && coincideFavorito;
    });
    renderLibros(librosFiltrados);
}
function marcarFavorito(id) {
    const libro = libros.find(libro => libro.id==id);
    libro.favorito = !libro.favorito;
    aplicarFiltros();
}

function marcarDisponible(id) {
    const libro = libro.find(libro => libro.id==id);
    libro.disponible = !libro.disponible;
    aplicarFiltros();
}

function eliminarLibro(id) {
    libros = libros.filter(libro => libro.id !== id);
    poblarGeneros();
    aplicarFiltros();
}

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', function(event){
    event.preventDefault();

    const nuevoLibro = {
        id: generarId(),
        titulo: bookForm.title.value.trim(),
        autor: bookForm.autor.value.trim(),
        genero: bookForm.genero.value.trim(),
        año: Number(bookForm.year.value),
        disponible: true,
        favorito : false
    };

    libros.push(nuevoLibro);
    bookForm.reset();
    poblarGeneros();
    aplicarFiltros();
});

document.getElementById('buscar').addEventListener('input',aplicarFiltros);
document.getElementById('filtro-genero').addEventListener('change',aplicarFiltros);
document.getElementById('mostrar-favoritos').addEventListener('change',aplicarFiltros);

poblarGeneros();
aplicarFiltros();