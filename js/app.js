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
    //Diria de validar tambien que la fecha sea mayor a la actual.
    if (formCarrera.reportValidity()) {
        if (sistema.carreraYaExiste(nuevaCarrera.nombre)) {
            alert('La carrera ya fue ingresada')
        }else{
            sistema.agregarCarrera(nuevaCarrera)
            formCarrera.reset()
            carreraEnPatrocinadores(nuevaCarrera.nombre)
        }
    }else{
        alert('Faltan validaciones')
    }
}

function carreraEnPatrocinadores(nombreCarrera) {
    let carrerasTotales = sistema.devuelveCarreras()
    let lista = document.getElementById('listaPatrocinadores')
    lista.innerHTML = '';
    for (carrera of carrerasTotales) {
        let elementoOption = document.createElement('option')
        let nodoNombreCarrera = document.createTextNode(carrera.nombre)
        elementoOption.appendChild(nodoNombreCarrera)
        lista.appendChild(elementoOption)
    }
}