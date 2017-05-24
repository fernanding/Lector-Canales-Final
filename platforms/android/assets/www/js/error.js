/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.error = {};

$.error.caja = null;

$.error.setCaja = function (caja){
    $.error.caja = caja;
};

$.error.msg = function (titulo, mensaje) {
    $($.error.caja).empty();
    $($.error.caja).append("<h2>"+titulo+"</h2>");
    $($.error.caja).append("<p>"+mensaje+"</p>");
};

