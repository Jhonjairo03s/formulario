const NuevaTarea = document.querySelector('#btn-tarea');
const formulario = document.querySelector('.formulario');
const abrir = document.querySelector('#btn-anadir');
const cerrar = document.querySelector('#btn-cerrar');
const ficha = document.querySelector('.ficha');

NuevaTarea.addEventListener("click", () => {
    formulario.style.display = "block";
});

cerrar.addEventListener("click", () => {
    formulario.style.display = "none";
});

abrir.addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;

    // Validación básica 
    if (!titulo || !fecha) {
        alert("Por favor, completa los campos Título, Fecha y Descripción.");
        return;
    }

    const tarea = { titulo, fecha, descripcion };

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    actualizarFicha(); // Llama a la función para actualizar la visualización

    // Mostrar notificación con SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Tarea agregada',
        text: 'La tarea se ha agregado correctamente.',
    });

    // Limpiar formulario y cerrarlo
    formulario.reset();
    formulario.style.display = "none";
});

function actualizarFicha() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    let contenido = '';
    tareas.forEach((tarea, index) => {
        contenido += `<div class="tarea-carta">`;

        contenido += `<p class="titulo">Título: ${tarea.titulo} (ID: ${index})</p>`;
        contenido += `<p class="fecha">Fecha: ${tarea.fecha}</p>`;
        contenido += `<p class="descripcion">Descripción: ${tarea.descripcion}</p>`;
        
        contenido += `<div class="botones-tarea">`;
        contenido += `<button id="btn-editar" data-index="${index}">Editar</button>`;
        contenido += `<button id="btn-eliminar" data-index="${index}">Eliminar</button>`;
        contenido += `</div>`;

        contenido += `</div>`;
    });
    ficha.innerHTML = contenido;

    document.querySelectorAll("#btn-editar").forEach((btn) => {
        btn.addEventListener('click', editarTarea);
    });

    document.querySelectorAll("#btn-eliminar").forEach((btn) => {
        btn.addEventListener('click', eliminarTarea);
    });
}

function editarTarea(event) {
    if (confirm("¿Estás seguro de que quieres editar esta tarea?")) {
        const index = event.target.dataset.index;
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        const tarea = tareas[index];

        // Llenar el formulario con los datos de la tarea
        document.getElementById("titulo").value = tarea.titulo;
        document.getElementById("fecha").value = tarea.fecha;
        document.getElementById("descripcion").value = tarea.descripcion;

        // Mostrar el formulario
        formulario.style.display = "block";

        // Cambiar el evento del botón "Añadir" para que actualice la tarea
        btnAñadir.removeEventListener("click", añadirTarea);
        btnAñadir.addEventListener("click", () => actualizarTarea(index));
    }
}


function eliminarTarea(event) {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
        const index = event.target.dataset.index;
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareas.splice(index, 1); // Eliminar la tarea del array
        localStorage.setItem("tareas", JSON.stringify(tareas));
        Swal.fire({
            icon: 'success',
            title: 'Tarea borrada',
            text: 'La tarea se ha borrado correctamente.',
        });

        actualizarFicha();
    }
}

function actualizarTarea(index) {
    // ... (código para obtener los valores del formulario)

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas[index] = tarea; // Actualizar la tarea en el array
    localStorage.setItem("tareas", JSON.stringify(tareas));
    Swal.fire({
        icon: 'success',
        title: 'Tarea actualizada',
        text: 'La tarea se ha actualizado correctamente.',
    });

    actualizarFicha();

    // Restablecer el evento del botón "Añadir"
    btnAñadir.removeEventListener("click", actualizarTarea);
    btnAñadir.addEventListener("click", añadirTarea);

    // Limpiar formulario y cerrarlo
    formulario.reset();
    formulario.style.display = "none";
}

// Cargar tareas al inicio
actualizarFicha(); // Llama a la función al cargar la página


