class Sistema {
    constructor(){
        this.listaCarreras = new Array();
        this.listaCorredores = new Array();
        this.listaPatrocinadores = new Array();
    }
    agregarCarrera(nuevaCarrera){
        this.listaCarreras.push(nuevaCarrera)
        console.log('Pusheo carrera')
    }
    devuelveCarreras(){
        console.log('devuelve carrera')
        return this.listaCarreras
        
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