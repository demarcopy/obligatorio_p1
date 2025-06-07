window.addEventListener('load', inicio);
function inicio() {
    document.getElementById('btnAgregarCarrera').addEventListener('click',agregarCarrera);
}

let sistema = new Sistema();

function agregarCarrera() {
    let formCarrera = document.getElementById('formcarrera')
    let nombre = document.getElementById('nombreCarrera').value
    let departamento = document.getElementById('departamentoCarrera').value
    let fecha = document.getElementById('carreraDateForm').value
    let cupo = parseInt(document.getElementById('cupoFormCarrera').value)
    let nuevaCarrera = new Carrera(nombre,departamento,fecha,cupo)
    if (formCarrera.reportValidity()) {
        sistema.agregarCarrera(nuevaCarrera)
    }else{
        alert('Faltan validaciones')
    }

    
}


/* Prueba temporal, solo para entender como funciona 
function imprimir() {
    let carrerasTotales = sistema.devuelveCarreras()
    let lista = document.getElementById('prueba')

    for (carrera of carrerasTotales) {
        let x = document.createElement('li')
        let nodo = document.createTextNode(`${carrera.nombre} - ${carrera.departamento} - ${carrera.fecha};`)
        x.appendChild(nodo)
        lista.append(x)
    }
}

ej html 
            <ul id="prueba">

           </ul>

*/