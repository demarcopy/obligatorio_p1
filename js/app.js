window.addEventListener('load', inicio);
function inicio() {
    document.getElementById('datos').addEventListener('click',dspDatos);
    document.getElementById('estadisticas').addEventListener('click',dspEstadisiticas);
}
/*compararCon(otro) {
    let dif=this.IdleDeadline.otro.edad;
    if (dif===0) {
        dif=this.apellido.localeCompare(otro.apellido);
    }
    return dif;
} 
*/