//cardlibro
//renderlibro
function cardLibro(libro) {
    const tarjeta= document.createElement('li');
    tarjeta.className= 'book-card';

    tarjeta.innerHTML = `
    <h3>${libro.titulo}</h3>
    <p class="book-badges">${libro.autor} · ${libro.genero} · ${libro.año}</p>
    <div class="book-badges">
        <span class="badge ${libro.disponible ? 'badge-success' : 'badge-muted'} ">${libro.disponible ? 'Disponible' : 'No disponible'}</span>
        <span class="badge ${libro.favorito ? 'badge-accent' : 'badge-muted'}">${libro.favorito ? 'Favorito' : 'No favorito'}</span>
    </div>
    <div class="book-card-actions">
        <button class="btn btn-accent" onclick="marcarFavorito(${libro.id})">${libro.favorito ? 'Quitar de favoritos' : 'Marcar como favorito'}</button>
        <button class="btn btn-success" onclick="marcarDisponible(${libro.id})">Marcar como ${libro.disponible ? 'no disponible' : 'disponible'}</button>
        <button class="btn btn-danger" onclick="eliminarLibro(${libro.id})">Eliminar</button>
    </div>
    `
    return tarjeta;
}

function renderLibros(listaLibros) {
    const contenedor = document.getElementById('book-list');
    const estadoVacio = document.getElementById('empty-state');
    listaLibros.forEach(libro => {
        contenedor.appendChild(cardLibro(libro));
    });

    if (estadoVacio)
    {
        estadoVacio.hidden = listaLibros.length > 0;
    }
    const contador = document.getElementById('book-count');
    if(contador) {
        contador.textContent = listaLibros.length;
    }
}