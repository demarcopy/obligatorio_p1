//test 
    class Sistema {
    constructor(){
        this.listaCarreras = new Array();
        this.listaCorredores = new Array();
        this.listaPatrocinadores = new Array();
        this.listaInscripciones = new Array();
    
     
    function CarreraConMasInscriptos() {
    let max=0;
    let resultado = '';   
        for (let i=0; i <= this.listaInscripciones .length-1 ; i++) {
            let nombreCarrera = this.listaInscripciones[i].carrera.nombre
            let sumaInscriptos = 0;

            for (let j = 0; j <= this.listaInscripciones.length-1; j++) {
                if (this.listaInscripciones[j].carrera.nombre === nombreCarrera) {
                    sumaInscriptos ++
                }

            if (sumaInscriptos >= max) {
                if (sumaInscriptos = max) {
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