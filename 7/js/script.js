
$(document).ajaxSuccess(function () {//.ajaxSuccess()
    $("footer").text("Ajax success!").delay(100).slideUp(3000);//.text()
}).ajaxError(function () {
    $("footer").text("Ajax Error!").delay(100);
});

$(document).ready(function () {

$("#autumn_btn").click(()=>{
    $( "#div1" ).load( "html_info/autumn.html #autumn" ); 
})

$("#winter_btn").click(()=>{
    $( "#div2" ).load( "html_info/winter.html #winter" ); 
})

$("#summer_btn").click(()=>{
    $( "#div3" ).load( "html_info/summer.html #summer" ); 
})

$("#spring_btn").click(()=>{
    $( "#div4" ).load( "html_info/spring.html #spring" ); 
})

//$.get(url [,data] [,success] [,dataType]);
// назначение параметров url и data аналогичны тем, которые приведены в описании функции load
// success - функция обратного вызова, которая выполнится в случае успешного завершения запроса: function(data, textStatus, xhr):
    // data - ответ сервера
    // textStatus - статус ответа
    // xhr - XMLHTTPRequest объект
// dataType - принудительно указать тип данных, который должен прийти с сервера.


$("#autumn_add_btn").click(()=>{
    $.getJSON( "json/autumn.json", function ( data, textStatus, jqXHR ) { // указываем url и функцию обратного вызова
        var out = ""; // создаем пустую строковую переменную
        for ( key in data ) { // создаем цикл for in
      out += ( key + ": " + data[key] + "<br>"); // добавляем в переменную все ключи объекта и их значения
        };
        $("#div1").after(`${out}`);

      })
})

$("#winter_add_btn").click(()=>{
    $.getJSON( "json/winter.json", function ( data, textStatus, jqXHR ) { // указываем url и функцию обратного вызова
        var out = ""; // создаем пустую строковую переменную
        for ( key in data ) { // создаем цикл for in
      out += ( key + ": " + data[key] + "<br>"); // добавляем в переменную все ключи объекта и их значения
        };
        $("#div2").after(`${out}`);

      })
})

$("#summer_add_btn").click(()=>{
    $.getJSON( "json/summer.json", function ( data, textStatus, jqXHR ) { // указываем url и функцию обратного вызова
        var out = ""; // создаем пустую строковую переменную
        for ( key in data ) { // создаем цикл for in
      out += ( key + ": " + data[key] + "<br>"); // добавляем в переменную все ключи объекта и их значения
        };
        $("#div3").after(`${out}`);

      })
})

$("#spring_add_btn").click(()=>{
    $.getJSON( "json/spring.json", function ( data, textStatus, jqXHR ) { // указываем url и функцию обратного вызова
        var out = ""; // создаем пустую строковую переменную
        for ( key in data ) { // создаем цикл for in
      out += ( key + ": " + data[key] + "<br>"); // добавляем в переменную все ключи объекта и их значения
        };
        $("#div4").after(`${out}`);

      })
})


});