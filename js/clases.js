class Sistema {
    constructor(){
        this.listaCarreras = new Array();
        this.listaCorredores = new Array();
        this.listaPatrocinadores = new Array();
        this.listaInscripciones = new Array();
    }
    agregarCarrera(nuevaCarrera){
        this.listaCarreras.push(nuevaCarrera)
        this.listaCarreras.sort((a,b) => {return a.nombre.localeCompare(b.nombre)})
    }
    devuelveCarreras(){
        return this.listaCarreras
        
    }
    carreraYaExiste(nombreDeCarrera){
        let existe = false;
        let carrerasTotales = this.devuelveCarreras()
        for (const carrera of carrerasTotales) {
            if (carrera.nombre === nombreDeCarrera) {
                existe = true;
                break
            } 
        }
        return existe
    }
    agregarPatrocinador(nuevoPatrocinador){
        this.listaPatrocinadores.push(nuevoPatrocinador)
    }
    devuelvePatrocinadores(){
        return this.listaPatrocinadores
    }
    patrocinadorYaExiste(nombrePatrocinador){
    let existe = false;
    let patrocinadoresTotales = this.devuelvePatrocinadores()
    for (const patrocinador of patrocinadoresTotales) {
        if (patrocinador.nombre === nombrePatrocinador) {
            existe = true;
            break
        }
    }
    return existe
    }
    actualizarPatrocinador(nuevoPatrocinador){
        let patrocinadoresTotales = this.devuelvePatrocinadores()
        for (const patrocinador of patrocinadoresTotales) {
            if (patrocinador.nombre === nuevoPatrocinador.nombre) {
                patrocinador.rubro = nuevoPatrocinador.rubro;
                patrocinador.carrera = nuevoPatrocinador.carrera
                break
            }
        }
    }
    agregarCorredor(nuevoCorredor){
        this.listaCorredores.push(nuevoCorredor)
        this.listaCorredores.sort((a,b) => {return a.nombre.localeCompare(b.nombre)})
    }
    cedulaUnica(cedulaCorredor){
        let existe = false;
        let corredoresTotales = this.listaCorredores;
        for (const corredor of corredoresTotales) {
            if (corredor.cedula === cedulaCorredor) {
                existe = true;
                break
            } 
        }
        return existe
    }
    devuelveCorredores(){
        return this.listaCorredores
    }
    buscarDatoInscripcion(lista, elemento) {
        if (lista === 'Corredores') {
            return this.listaCorredores.find(corredor => corredor.cedula === elemento) || null;
        }else{
            return this.listaCarreras.find(carrera => carrera.nombre === elemento) || null;
        }
    }
    bajarCupo(nombreCarrera){
        let indice = this.listaCarreras.findIndex(c => c.nombre === nombreCarrera);
        this.listaCarreras[indice].cupo = this.listaCarreras[indice].cupo  -1
    }
    agregarInscripcion(nuevaInscripcion){
        if(!this.listaInscripciones.some(
            inscripcionIngresada=> inscripcionIngresada.carrera.nombre === nuevaInscripcion.carrera.nombre && 
            inscripcionIngresada.corredor.cedula === nuevaInscripcion.corredor.cedula))
        {   
            //Aca se valida si la carrera a Inscribirse ya tiene por lo menos una inscripcion.
            if (this.listaInscripciones.some(inscripcionIngresada => inscripcionIngresada.carrera.nombre === nuevaInscripcion.carrera.nombre)) {
                let max = 0
                for (const inscripcion of this.listaInscripciones) {
                    if (inscripcion.corredor.numero > max ) {
                        max = inscripcion.corredor.numero
                    }
                }
                nuevaInscripcion.corredor.numero = max+1
            }else{
                nuevaInscripcion.corredor.numero = 1
            }       
            this.listaInscripciones.push(nuevaInscripcion);
            this.bajarCupo(nuevaInscripcion.carrera.nombre);
            alert('Nuevo corredor inscripto')
        }else {
            alert('El corredor ya esta inscripto a esta carrera.')
        }
    }
    promInscripcionesPorCarrera(){
        let totalInscripciones = this.listaInscripciones.length;
        let totalCarreras = this.listaCarreras.length;
        if (totalCarreras === 0) {
            return 0; 
        }
        return (totalInscripciones / totalCarreras).toFixed(2);
    }
    CarreraConMas() { 
    const auxArray = []; 
    const cantInscriptosArray = [];
    const carrerasMasInscriptos = [];
    // Itera todas las inscripciones
    for (let i = 0; i < this.listaInscripciones.length; i++) {
        const nombreCarrera = this.listaInscripciones[i].carrera.nombre;
        //Evalua si la carrera en el indice actual existe en array auxiliar, si no esta lo pushea
        const index = auxArray.indexOf(nombreCarrera);
        if (index === -1) {
            auxArray.push(this.listaInscripciones[i].carrera); 
            cantInscriptosArray.push(1); 
            console.log(auxArray)
            //Si la carrera ya esta en array auxiliar incrementa la cantidad de inscriptos por el indice de la carrera.
        } else {
            cantInscriptosArray[index]++;
        }
    }
    //Con la logica de los dos arrays anteriores evalua que carrera tiene mas inscriptos.
    let maximo = 0;
    for (let i = 0; i < cantInscriptosArray.length; i++) {
        if (cantInscriptosArray[i] > maximo) {
            maximo = cantInscriptosArray[i];
        }
    }   
    //Sabiendo el maximo evaluamos aquellos que estan en el max de inscriptos para pushearlo al array de resultado.
    cantInscriptosArray.forEach((cantidad, i) => {
        if (cantidad === maximo) {
            let fecha = auxArray[i].fecha
            let fechaFormateada = fecha.toLocaleDateString('es-UY');
            carrerasMasInscriptos.push(`${auxArray[i].nombre} en ${auxArray[i].departamento} el ${fechaFormateada} Inscriptos: ${maximo}`);
        }
    });
    return carrerasMasInscriptos
    }
    CarreraSinInscriptos() {
        let sinInscriptos=[];
        let resultado = [] 
        for(let i = 0; i < this.listaCarreras.length; i++) {
            let carreraActual = this.listaCarreras[i];
            let tieneInscripciones = false;
            for(let j = 0; j < this.listaInscripciones.length; j++) {

                if(this.listaInscripciones[j].carrera.nombre === carreraActual.nombre) {
                    tieneInscripciones = true;
                    break;
                }
            }
            if(!tieneInscripciones) {
                sinInscriptos.push(carreraActual);
            }
        }
        sinInscriptos.sort((a,b) => a.compararFechaCreciente(b))
        for (const carrera of sinInscriptos) {
            resultado.push(carrera.nombre)
        }
        return resultado
    }
    porcentajeElite() { 
        let corredoresElite = 0;
        let resultado = 0;
        for (const corredor of this.listaCorredores) {
            if (corredor.tipo === "Deportista Elite") {
                corredoresElite ++;
            }
        }
        if (this.listaCorredores.length === 0) {
            resultado = 0
        }else{
            resultado = ((corredoresElite / this.listaCorredores.length) * 100).toFixed(2);
        }
        
        return resultado; 
    } 
    devuelveCorredoresEnCarrera(carrera,ordenamiento){
    let corredoresEnCarrera = [];
    for (const inscripcion of this.listaInscripciones) {
        if (inscripcion.carrera.nombre === carrera) {
            corredoresEnCarrera.push(inscripcion.corredor)  
        }      
    }
        if (ordenamiento == 'nombre') {
            corredoresEnCarrera.sort((a,b) => { return a.nombre.localeCompare(b.nombre)})
        }else{
            corredoresEnCarrera.sort((a,b) => { return a - b})
        }
    return corredoresEnCarrera
    }
    carrerasPorDepartamento(){ 
        let listaDepartamentos = []; 
        let listaConCarreras = [];
        let resultado = [['Departamento', 'Carreras']];
        // Itera todas las carreras
        for (let i = 0; i < this.listaCarreras.length; i++) {
            let departamentoCarrera = this.listaCarreras[i].departamento;
            let indexDepartamentoEnLista = listaDepartamentos.indexOf(departamentoCarrera);
            if (indexDepartamentoEnLista === -1) {
                listaDepartamentos.push(departamentoCarrera);
            }
        }
        for (let j = 0; j < listaDepartamentos.length; j++) {
            listaConCarreras[j] = 0;
            for (let ind = 0; ind < this.listaCarreras.length; ind++) {
                
                if (listaDepartamentos[j] === this.listaCarreras[ind].departamento) {
                    listaConCarreras[j]++;
                }                 
            }
        }
        
        for (let index = 0; index < listaDepartamentos.length; index++) {
            resultado.push([listaDepartamentos[index], listaConCarreras[index]]);
        }
        return resultado;
    }
    inscripcionesPorDepartamento(){
        let listaDepartamentos = []; 
        let listaConInscripciones = [];
        let resultado = [['Departamento', 'Inscripciones']];
        // Itera todas las inscripciones
        for (let i = 0; i < this.listaInscripciones.length; i++) {
            let departamentoInscripcion = this.listaInscripciones[i].carrera.departamento;
            let indexDepartamentoEnLista = listaDepartamentos.indexOf(departamentoInscripcion);
            if (indexDepartamentoEnLista === -1) {
                listaDepartamentos.push(departamentoInscripcion);
            }
        }
        for (let j = 0; j < listaDepartamentos.length; j++) {
            listaConInscripciones[j] = 0;
            for (let ind = 0; ind < this.listaInscripciones.length; ind++) {
                
                if (listaDepartamentos[j] === this.listaInscripciones[ind].carrera.departamento) {
                    listaConInscripciones[j]++;
                }                 
            }
        }       
        for (let index = 0; index < listaDepartamentos.length; index++) {
            resultado.push([listaDepartamentos[index], listaConInscripciones[index]]);
        }
        return resultado;
    }
}
    



class Carrera {
    constructor(nombre,departamento,fecha,cupo){
        this.nombre = nombre; 
        this.departamento = departamento;
        this.fecha = new Date(fecha);
        this.cupo = cupo;
    }
    compararFechaCreciente(otraCarrera){
        return  this.fecha - otraCarrera.fecha
    }
}

class Corredor{
    constructor(nombre,edad,cedula,vencFichaMedica,tipo){
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.vencFichaMedica = vencFichaMedica;
        this.tipo = tipo;
    }
}

class Inscripcion{
    constructor(corredor,carrera){
        this.corredor = corredor;
        this.carrera = carrera;
    }
}

class Patrocinador{
    constructor(nombre,rubro,carrera){
        this.nombre = nombre;
        this.rubro = rubro;
        this.carrera = carrera;
    }
}