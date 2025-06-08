class Sistema {
    constructor(){
        this.listaCarreras = new Array();
        this.listaCorredores = new Array();
        this.listaPatrocinadores = new Array();
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
}

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