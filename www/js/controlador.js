/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.controller = {};
var indice;
$.controller.muestra = function(caja){
    // Para cerrar el menú cuando pulsamos una opción
    $(".navbar-collapse").collapse("hide");
    $(".panel").hide();
    $(caja).show("slow");
};

$.controller.addChannel = function (){
    // leemos del formulario y creamos el canal con esa información
    $.canal.add($("#nombreCanal").val(), $("#urlCanal").val());
    // si el canal "funciona" lo añadimos a marcadores  
    // $.canales.create($.canal);
    $(".panel").hide();
    $("#start").show();
    
};

$.controller.cargaCanales =  function () {
    var i=0;
    $.editar=0;
    $.canales.load();
    $("#start").empty();
    for (i=0; i< $.canales.tam(); i++){
        // $("#start").append('<div class="col-xs-4" style=background-color:lavender;">'+$.canales.lista_canales[i].nombre+'</div>');        
        $.controller.add2rejilla(i);
    }
};

$.controller.add2rejilla = function (index) {
    $("#start").append('<div onclick="$.controller.cargaNoticias('+index+')" class="col-xs-4" style=background-color:lavender;">'+$.canales.lista_canales[index].nombre+'</div>');
//console.log($.canales.lista_canales.length);
};

$.controller.cargaNoticias = function (index) {
    $("#news").empty();
    $("#start").hide();
    $("#news").show();
    if ($.canales.lista_canales[index].tipo==="rss") {
        $.controller.cargaRSS(index);
    } else {  
        if ($.canales.lista_canales[index].tipo==="atom") {
            $.controller.cargaATOM(index);
        }else{
            $.error.msg("Listando noticias", "Tipo de canal desconocido." );
            // ERROR tipo de canal desconocido
        }
    }
    
};

$.controller.cargaRSS =  function(index){
   // $("#news").append('<h3>RSS: '+$.canales.lista_canales[index].nombre+'</h3>');
    
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "select * from rss where url=\""+$.canales.lista_canales[index].url+"\"",
            format: "json"
        },
        success: function (response) {
            // código para listar las noticias del canal RSS
             var i;
                  var caja;
                // limpiamos la caja donde van las noticias
                $("#news").empty();
                // Guardo el ARRAY de noticias de este canal
                var lista = response.query.results.entry;
                
                for (i=0;i<response.query.count;i++){
                    caja = $("<div></div>");
                    caja.addClass("well well-sm");
                    caja.attr("data-title", $.canales.lista_canales[index].nombre);
                    caja.append("<h3>"+lista[i].title+"</h3><br/>");
                    if (lista[i].summary.content === undefined){
                        caja.append("<p>"+lista[i].summary+"</p>");
                    }else{
                         caja.append("<p>"+lista[i].summary.content+"</p>");
                        
                    }
                    caja.append("<p>"+lista[i].updated+"</p>");
                    caja.append("<p> <a href='"+lista[i].link+"'>Pulse aquí para abrir la noticia.</a></p>");
                                     
                    $("#news").append(caja);
                } 
                }  
       
    });
};

$.controller.cargaATOM = function(index){
   console.log($.canales.lista_canales[index].url);
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "select * from atom where url=\""+$.canales.lista_canales[index].url+"\"",
            format: "json"
        },
        success: function (response) {
            // código para listar las noticias del canal ATOM
             var i;
                  var caja;
                // limpiamos la caja donde van las noticias
                $("#news").empty();
                // Guardo el ARRAY de noticias de este canal
                var lista = response.query.results.entry;
                
                for (i=0;i<response.query.count;i++){
                    caja = $("<div></div>");
                    caja.addClass("well well-sm");
                    caja.attr("data-title", $.canales.lista_canales[index].nombre);
                    caja.append("<h3>"+lista[i].title+"</h3><br/>");
                    if (lista[i].summary.content === undefined){
                        caja.append("<p>"+lista[i].summary+"</p>");
                    }else{
                         caja.append("<p>"+lista[i].summary.content+"</p>");
                        
                    }
                    caja.append("<p>"+lista[i].updated+"</p>");
                    caja.append("<p> <a href='"+lista[i].link+"'>Pulse aquí para abrir la noticia.</a></p>");
                                     
                    $("#news").append(caja);
                } 
                } 
    });
}
    
$.controller.MostrarGestion=function(){
         var i=0;
         
       $("#table").empty();
    $.canales.load();
    //$("#manager").empty();
    for (i=0; i< $.canales.tam(); i++){
       // $("#table").append('<tbody><tr><td>'+$.canales.lista_canales[i].nombre+'</td><td>'+$.canales.lista_canales[i].url+'</td></div></td></tr></tbody>');
     $("#table").append('<tbody><tr><td>'+$.canales.lista_canales[i].nombre+'</td><td>'+$.canales.lista_canales[i].url+'</td>\n\
<td><div onclick="$.controller.GenerarEditar('+i+')" class="btn btn-warning"> Editar </td><td></div>\n\
<div onclick=" $.controller.EliminarCanal('+i+')" class="btn btn-danger">Eliminar</div></td></tr></tbody>');        
              
    }

};
//Genera la ventana para editar el nombre
 $.controller.GenerarEditar=function(index){
       //metodo para ocultar el panel manager y monstar el editar canal
       $("#manager").hide();
       
       $("#GenerarEditar").show();
       document.getElementById('CanalNombre').value=$.canales.lista_canales[index].nombre.toUpperCase();
        indice=index;
       
       //$("#CanalNombre").append($.canales.lista_canales[index].nombre);
        /* $("#GenerarEditar").append('<h3>Editar alimentador</h3><div class="container"><div class="well"><div class="form-group">'+
               +'<input type="text" class="form-control" id="urlCanal" placeholder="URL del alimentador">'+url+'</div>'+
               +'<div class="form-group"><div onclick="undefined" class="btn btn-success"> Editar </div>'+
               +'<div onclick="$.controller.CancelarEditar()" class="btn btn-danger"> Cancelar </div></div></div></div>');
       */
   }
//Metodo el cual una vez editamos el canal se encarga de realizar los cambios
  $.controller.EditarCanal=function(){
      var nombreModificado=document.getElementById('CanalNombre').value;
      //console.log($.canales.findByNombre(nombreModificado));
      //var index=$.canales.findByNombre(nombreModificado);
      //console.log(indice);
      if($.canales.findByNombre(nombreModificado)== true){
      alert("Ese nombre ya existe");
      }else{
      $.canales.lista_canales[indice].nombre=nombreModificado;
      
      $.canales.save();
      $.canales.load();
      
       $.controller.MostrarGestion();
      
     
     $.controller.cargaCanales();
      //$("#manager").hide();
          $("#GenerarEditar").hide();
      $("#manager").show();
      }
  }
  //boton de cancelar en el panel de editar canal
  $.controller.CancelarEditar=function(){
      //metodo de cancelar en el editar canal
             $("#manager").show();
       $("#GenerarEditar").hide();
  }
  
  
   $.controller.EliminarCanal=function(index){
   $.canales.delete(index);  
      $.canales.save();
      $.canales.load();
      
       $.controller.MostrarGestion();
      
     
     $.controller.cargaCanales();
      //$("#manager").hide();
      $("#manager").show();
  }
 $.controller.Minuscula=function(nombre){
     var letras="abcdefghijklmnñopqrstuvwxyz";
     
     for (var i = 0; i < nombre.length(); i++) {
        for (var j = 0; j < letras.length; j++) {
            
        }
    }
 }