window.addEventListener('load', inicio);
function inicio() {
    document.getElementById('btnAgregarCarrera').addEventListener('click',agregarCarrera);
    document.getElementById('btnAgregarPatrocinador').addEventListener('click',agregarPatrocinador)
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
            carreraEnLista('listaCarrerasPatrocinador')
            carreraEnLista('carrerasInscripcion')
        }
    }else{
        alert('Faltan validaciones')
    }
}

function carreraEnLista(idElemento) {
    let carrerasTotales = sistema.devuelveCarreras()
    let listaPatrocinadores = document.getElementById(idElemento)
    listaPatrocinadores.innerHTML = '';
    for (const carrera of carrerasTotales) {
        let elementoOption = document.createElement('option')
        let nodoNombreCarrera = document.createTextNode(carrera.nombre)
        elementoOption.appendChild(nodoNombreCarrera)
        listaPatrocinadores.appendChild(elementoOption)
    }
}

function agregarPatrocinador() {
    let nombre = document.getElementById('nombrePatrocinadorForm').value;
    let rubro = document.getElementById('rubroPatrocinador').value;
    let carreras = document.getElementById('listaCarrerasPatrocinador').value

    let nuevoPatrocinador = new Patrocinador(nombre,rubro,carreras)

    let totalPatrocinadores = sistema.devuelvePatrocinadores()

    if (sistema.patrocinadorYaExiste(nuevoPatrocinador.nombre)) {
        alert('Patrocinador ya existe - Se actualizan datos')
        sistema.actualizarPatrocinador(nuevoPatrocinador)
        console.log(totalPatrocinadores)
        alert('Patrocinador actualizado')
    }else{      
        sistema.agregarPatrocinador(nuevoPatrocinador)  
        alert('Patrocinador agregado') 
    }
}