window.addEventListener('load', inicio);
function inicio() {
    document.getElementById('formcarrera').addEventListener('submit',function (e){
        e.preventDefault();
        agregarCarrera();
    });
    document.getElementById('formpatrocinadores').addEventListener('submit',function (e){
        e.preventDefault();
        agregarPatrocinador();
        sistema.CarreraConMas();
    });
    document.getElementById('formcorredores').addEventListener('submit',function (e){
        e.preventDefault();
        agregarCorredor();
    }); 
    document.getElementById('forminscripciones').addEventListener('submit', function (e){
        e.preventDefault();
        inscribirCorredor();
    }); 
    document.getElementById('datos').addEventListener('click', function (e){
        e.preventDefault();
        despliegue('datos');
    }); 
    document.getElementById('estadisticas').addEventListener('click', function (e){
        e.preventDefault();
        despliegue('estadisticas');
        insertarDatosGenerales()
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
            alert('Nuevo corredor inscripto')
            //sistema.CarreraConMasInscriptos()ssss
        }
    }
}

function despliegue(boton) {
    let sectionEstadisticas=document.getElementById("secEstadisticas");
    let sectionDatos=document.getElementById('secDatos');
    if (boton==='datos') {
        if (sectionDatos.style.display === "none") {
            sectionDatos.style.display= "block";
            sectionEstadisticas.style.display = 'none';
        }
    } else{
        if (sectionEstadisticas.style.display === "none" || sectionEstadisticas.style.display === "" ) {
            sectionEstadisticas.style.display = "block";
            sectionDatos.style.display = "none"
        }
    }
}

function insertarDatosGenerales() {
    const promedioInscripciones = sistema.promInscripcionesPorCarrera();
    const carreraMasInscriptos = sistema.CarreraConMas();
    const carreraSinInscriptos = sistema.CarreraSinInscriptos();
    const porcentajeElite = sistema.porcentajeElite();
    
    // Insertar promedio de inscriptos por carrera
    if (promedioInscripciones != 0) {
        document.getElementById('promInscriptos').textContent= ("Promedio de inscriptos por carrera: " + promedioInscripciones );       
    }

    // Insertar carrera con mas inscripciones
    if (carreraMasInscriptos.length > 0) {
        const ListaConMas = document.getElementById('listaCarrerasInscriptos');
        ListaConMas.innerHTML = "";
        carreraMasInscriptos.forEach(i => {
            const li=document.createElement("li");
            li.textContent=i;
            ListaConMas.appendChild(li);
        });      
    }

    // Insertar carreras sin inscriptos
    if(carreraSinInscriptos.length > 0){
        let carreraSinInscriptosList = document.getElementById('carrerasSinInscriptos')
        carreraSinInscriptosList.innerHTML="";
        carreraSinInscriptos.forEach(i => {
            const li=document.createElement("li");
            li.textContent=i;
            carreraSinInscriptosList.appendChild(li);
        });
    }

    // Insertar porcentaje de elite.
    if (porcentajeElite != 0) {
        let parrafCorredoresElite = document.getElementById('parrafCorredoresElite')
        parrafCorredoresElite.textContent = `Promedio de corredores de élite: ${porcentajeElite}%`;      
    }

}