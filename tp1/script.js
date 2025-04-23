let tarjetas=[];

const formulario = document.getElementById('form');

formulario.addEventListener('submit', function(event) {
    // Evita que se recargue la página al enviar el formulario
    event.preventDefault();
    
    // Obtiene los valores seleccionados
    const Id = Date.now(); //id del elemento
    let tarea = document.getElementById('tarea').value;
    let prioridad = document.getElementById('prioridad').value;
    let categoria = document.getElementById('categoria').value;
    tarjetas.push({Id,tarea,prioridad,categoria});
    organizarPrioridad(tarjetas);
    console.log(tarjetas);

    console.log('Tarea nueva: '+tarea)
    console.log('Prioridad seleccionada:', prioridad);
    console.log('Categoría seleccionada:', categoria);
    organizarPrioridad(tarjetas)
});


function eliminarTarjeta(id){
    console.log("hizo click")
    let tarjeta = document.getElementById(id);
    let indice = tarjetas.findIndex(tarjeta => tarjeta.Id==id);
    
     tarjetas.splice(indice, 1);
     tarjeta.remove();
     console.log(tarjetas,"new")
}

function organizarPrioridad(tarjetas) {
    let ordenPersonalizado = { "alto": 1, "medio": 2, "bajo": 3 };
    tarjetas.sort((a, b) => ordenPersonalizado[a.prioridad] - ordenPersonalizado[b.prioridad]);
    crearTarjetas(tarjetas)
    console.log(tarjetas); 
}

function crearTarjetas(tarjetas){
    let contenedor = document.getElementById('tarjetas');
    contenedor.innerHTML="";

    tarjetas.forEach(tarjeta => {
        let nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.classList.add('tarjeta', tarjeta.prioridad); // Clase según la prioridad
        nuevaTarjeta.id = tarjeta.Id;
        nuevaTarjeta.innerHTML = `
            <div class="tarjeta-arriba">
                <button id="eliminar" onclick="eliminarTarjeta(${tarjeta.Id})">X</button>
                <p>${tarjeta.tarea}</p>
                <p>${tarjeta.prioridad}</p>
                <p>${tarjeta.categoria}</p>
            </div>
            <div class="tarjeta-abajo">
                <p>Estado:</p>
                <label for="pendiente">Pendiente</label>
                <input class="radio" type="radio" name="estado-${tarjeta.Id}" id="pendiente">
                <label for="proceso">Proceso</label>
                <input class="radio" type="radio" name="estado-${tarjeta.Id}" id="proceso">
                <label for="finalizado">Finalizado</label>
                <input class="radio" type="radio" name="estado-${tarjeta.Id}" id="finalizado">
            </div>
        `;
        contenedor.appendChild(nuevaTarjeta);
    });

}

function filtrarTareas(e){
console.log(event.target.value)
}



