
$.canal = {};

$.canal.nombre = "";
$.canal.tipo = "";
$.canal.url = "";

$.canal.checkAndDo = function (nombre, url){
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "select * from rss where url=\""+url+"\"",
            format: "json"
        },
        success: function (response) {
            if (response.query.count >0) {
                $.canal.nombre = nombre;
                $.canal.tipo = "rss";
                $.canal.url = url;
                // push del canal
                $.canales.create({
                    "nombre": nombre,
                    "tipo": "rss",
                    "url": url
                });
                
            } else {
                 $.ajax({
                    url: "http://query.yahooapis.com/v1/public/yql",
                    jsonp: "callback",
                    dataType: "jsonp",
                    data: {
                        q: "select * from atom where url=\""+url+"\"",
                        format: "json"
                    },
                    success: function (response) {
                        if (response.query.count >0) {
                            // lo guardo como ATOM    
                            $.canal.nombre = nombre;
                            $.canal.tipo = "atom";
                            $.canal.url = url;
                            // push del canal
                            $.canales.create({
                                "nombre": nombre,
                                "tipo": "atom",
                                "url": url
                            });
                        } else {
                            var excepcion = new $.canal.ExcepcionURLNoValida(url);
                            throw excepcion;
                        }
                    }
                 });
             }
         },
         error: function (){
             var excepcion = new $.canal.ExcepcionSinConexion(url);
             throw excepcion;
         }
         
    });
};

$.canal.add = function(nombre, url){
    try {
        $.canal.checkAndDo(nombre, url);
    } catch (excepcion) {
        alert("Error al añadir el canal");
        console.log("Error al añadir canal",excepcion.mensaje);
        $.error.msg("Error al añadir canal",excepcion.mensaje);
    }
};

$.canal.update = function(nombre, tipo, url){
    $.canal.nombre = nombre;
    $.canal.tipo = tipo;
    $.canal.url = url;
};

$.canal.getUrl = function (){
    return $.canal.url;
};
/*
$.canal.setUrl = function (url){
    $.canal.url = url;
};
*/
$.canal.getNombre = function (){
    return $.canal.nombre;
};

$.canal.setNombre = function (nombre){
    $.canal.nombre = nombre;
};

$.canal.getTipo = function (){
    return $.canal.tipo;
};
/*
$.canal.setTipo = function (tipo){
    $.canal.tipo = tipo;
};
*/

$.canal.ExcepcionURLNoValida = function(valor) {
   this.valor = valor;
   this.mensaje = " La URL no es de un canal de noticias";
   $.error.msg("Error al añadir canal",this.mensaje);
   this.toString = function() {
      return this.valor + this.mensaje;
   };
};

$.canal.ExcepcionSinConexion = function(valor) {
   this.valor = valor;
   this.mensaje = " Error al añadir el canal, no hay conexión a Internet";
   $.error.msg("Error al añadir canal",this.mensaje);
   this.toString = function() {
      return this.valor + this.mensaje;
   };
};

