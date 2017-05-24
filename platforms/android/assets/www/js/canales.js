
var canales = {};

/* 
 * Lista de canales. No hay repetidos (con URL repetida).
 * Sí se puede tener dos con el mismo nombre.
 * @type Array
 */
canales.lista_canales = [];

/**
 * Esta función añade un canal a la lista y si existe la URL, 
 * lo actualiza
 * @param {canal} nuevo_canal El canal a añadir
 */
canales.create = function(nuevo_canal) {
    var url = nuevo_canal.getUrl();
    var existe = false;
    for (var i=0; i<canales.lista_canales.length; i++) {
        if (canales.lista_canales[i].getUrl() === url){
            existe = true;
            canales.lista_canales[i]=nuevo_canal;
            // return;
        }
    }
    if (existe === false) {
        canales.lista_canales.push(nuevo_canal);
    }
};

canales.read = function( index ) {
    if (!isNaN(index) && (index >= 0) && ( index < canales.lista_canales.length)) {
        return(canales.lista_canales[index]);
    } else {
        return(null);
    }
};

/*
 * Devuelve el canal que tenga esa misma URL.
 */
canales.findByURL = function ( url ){
    var encontrado = null;
    for (var i=0; i< canales.lista_canales.length; i++){
        if (canales.lista_canales[i].getUrl() === url) {
            return (canales.lista_canales[i]);
        }
    }
    return (encontrado);
};

/*
 * Devuelve en un Array los canales que tenga ese mismo tipo.
 */
canales.findByTipo = function ( tipo ){
    var lista = new Array(0);
    for (var i=0; i< canales.lista_canales.length; i++){
        if (canales.lista_canales[i].getTipo() === tipo) {
            lista.push(canales.lista_canales[i]);
        }
    }
    return (lista);
};


/*
 * Devuelve en un Array los canales que tenga ese mismo tipo.
 */
canales.findByNombre = function ( nombre ){
    var lista = new Array(0);
    for (var i=0; i< canales.lista_canales.length; i++){
        if (canales.lista_canales[i].getNombre() === nombre) {
            lista.push(canales.lista_canales[i]);
        }
    }
    return (lista);
};


canales.update = function ( index, canal_actualizado) {    
    if (!isNaN(index)) {
        if (index>=0 && index <canales.lista_canales.length){
            canales.lista_canales[index] = canal_actualizado;
        }
    }
};

canales.delete = function ( index ) {
    var arrayFinal = canales.lista_canales.splice(index, 1);
    canales.lista_canales = arrayFinal;
};

canales.tam = function (){
    return canales.lista_canales.length;
};

