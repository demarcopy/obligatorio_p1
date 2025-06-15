class Sistema {
    constructor(){
        this.listaCarreras = new Array();
        this.listaCorredores = new Array();
        this.listaPatrocinadores = new Array();
        this.listaInscripciones = new Array();
    }
    agregarCarrera(nuevaCarrera){
        this.listaCarreras.push(nuevaCarrera)
        console.log('Pusheo carrera')
        this.listaCarreras.sort((a,b) => {return a.nombre.localeCompare(b.nombre)})
    }
    devuelveCarreras(){
        console.log('devuelve carrera')
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
        console.log('Pusheo Patrocinador')
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
        if(!this.listaInscripciones.some(duplicado=>
            duplicado.carrera.nombre===nuevaInscripcion.carrera.nombre && duplicado.corredor===nuevaInscripcion.corredor
        )) {
            this.listaInscripciones.push(nuevaInscripcion);
            //console.log('Pusheo Inscripcion');
            this.bajarCupo(nuevaInscripcion.carrera.nombre)
            console.log(this.listaInscripciones);
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
    CarreraConMasInscriptos() { //CREAR OBJETO CON NOMBRE DE CARRERA Y CANTIDAD DE INSCRIPTOS RESPECTIVAMENTE
    let max=0;
    let resultado = '';   
    console.log('test');
        for (let i=0; i <= this.listaInscripciones.length-1 ; i++) {
            let nombreCarrera = this.listaInscripciones[i].carrera.nombre
            let sumaInscriptos = 0;
            let 

            for (let j = 0; j <= this.listaInscripciones.length-1; j++) {
                if (this.listaInscripciones[j].carrera.nombre === nombreCarrera) {
                    sumaInscriptos ++
                }

            
            }
           
            if (sumaInscriptos >= max) {
                    if (sumaInscriptos == max && (nombreCarrera!=resultado)) {
                        
                        resultado = resultado + ' ' + nombreCarrera
                        max = sumaInscriptos                    
                    }else{
                        resultado = nombreCarrera
                        max = sumaInscriptos
                    }
            }  
        }
    console.log(`${resultado} y ${max} `) 
 
    }
}
/*       
    }
    }
    listaDeCarrerasSinInscriptos() { //ordenados por fecha creciente

    }
    porcentajeElite() { 
   
    }
 */


class Carrera {
    constructor(nombre,departamento,fecha,cupo){
        this.nombre = nombre; 
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupo = cupo;
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