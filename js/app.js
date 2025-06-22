window.addEventListener('load', inicio);
function inicio() {
    document.getElementById('formcarrera').addEventListener('submit',function (e){
        e.preventDefault();
        agregarCarrera();
    });
    document.getElementById('formpatrocinadores').addEventListener('submit',function (e){
        e.preventDefault();
        agregarPatrocinador();
        sistema.CarreraConMasInscriptos();
    });
    document.getElementById('formcorredores').addEventListener('submit',function (e){
        e.preventDefault();
        agregarCorredor();
    }); 
    document.getElementById('forminscripciones').addEventListener('submit', function (e){
        e.preventDefault();
        inscribirCorredor();
    }); 

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
    
    if (formCarrera.checkValidity()) {
        
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
    let elementoCarreras = document.getElementById('listaCarrerasPatrocinador');
    let carreras = Array.from(elementoCarreras.selectedOptions).map(option => option.value);
    let formpatrocinadores = document.getElementById('formpatrocinadores');
    let nuevoPatrocinador = new Patrocinador(nombre,rubro,carreras)
    let totalPatrocinadores = sistema.devuelvePatrocinadores()
    
    if (formpatrocinadores.reportValidity()) {
        if (sistema.patrocinadorYaExiste(nuevoPatrocinador.nombre)) {

            alert('Patrocinador ya existe - Se actualizan datos')
            sistema.actualizarPatrocinador(nuevoPatrocinador)
            formpatrocinadores.reset()
            console.log(totalPatrocinadores)
            alert('Patrocinador actualizado')
            console.log(totalPatrocinadores)
        }else{      
            sistema.agregarPatrocinador(nuevoPatrocinador)
            formpatrocinadores.reset()  
            alert('Patrocinador agregado') 
            console.log(totalPatrocinadores)
        }
    }else{
        alert('Faltan validaciones')
    }  
}

function agregarCorredor() {
    let formCorredor = document.getElementById('formcorredores')
    let nombre = document.getElementById('nombreCorredores').value
    let edad = parseInt(document.getElementById('edadCorredores').value)
    let cedula = document.getElementById('cedulaCorredores').value
    let fechaVenciminento = document.getElementById('vencFichaCorredor').value
    let tipo = document.querySelector('input[name="tipoDeportista"]:checked').value;
    let nuevoCorredor = new Corredor(nombre,edad,cedula,fechaVenciminento,tipo)

    if (formCorredor.reportValidity()) {
        if (sistema.cedulaUnica(nuevoCorredor.cedula)) {
            alert('El corredor ya existe')
        }else{
            sistema.agregarCorredor(nuevoCorredor)
            corredorEnLista('corredoresInscripcion')
            formCorredor.reset()
            alert('Corredor agregado')
        }
    }else{
        alert('Datos Incorrectos')
    }
}

function corredorEnLista(idElemento) {
    let listaCorredores = document.getElementById(idElemento)
    let totalCorredores = sistema.devuelveCorredores()
    listaCorredores.innerHTML = '';
    for (const corredor of totalCorredores) {
        let resultado =  `${corredor.nombre} - ${corredor.cedula}`
        let value = corredor.cedula;
        let nodoOptionCorredor = document.createElement('option')
        nodoOptionCorredor.value = value;
        let nodoTextoCorredor = document.createTextNode(resultado)
        nodoOptionCorredor.appendChild(nodoTextoCorredor)
        listaCorredores.appendChild(nodoOptionCorredor)
    }
}


function inscribirCorredor() {
    let cedulaCorredor = document.getElementById('corredoresInscripcion').value
    let nombreCarrera = document.getElementById('carrerasInscripcion').value
    let corredor = sistema.buscarDatoInscripcion('Corredores',cedulaCorredor)
    let carrera = sistema.buscarDatoInscripcion('Carrera',nombreCarrera)
    if (corredor.vencFichaMedica < carrera.fecha) {
        alert('Inscripcion no es posible, la ficha medica vencio')    
    }else{
        if (carrera.cupo === 0) {
            alert('Inscripcion no es posible, no hay cupos en la carrera')
        }else{
            let nuevaInscripcion = new Inscripcion(corredor,carrera)
            sistema.agregarInscripcion(nuevaInscripcion);   
            //Se descarga PDF
            
            //sistema.CarreraConMasInscriptos()ssss
        }
    }
}