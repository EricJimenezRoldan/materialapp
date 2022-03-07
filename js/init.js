(function($){
  $(function(){

    $('.sidenav').sidenav();
    //$('.parallax').parallax();
    $('.tabs').tabs({"swipeable": true});
    

  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#update").click(function(){
      //Buidem la llista abans de actualitzar amb el nou contingur
      $("#llistaPrincipal").empty();
      $.ajax({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=5",
        dataType: "json",
      }).done(function (data) {
        for(let item in data) {
          let newElement = $('<a href="#" class="collection-item">'+data[item]["title"]+'</a>');
          console.log(data[item]["title"]);
          
          newElement.click( function() {
            //Buidem el contingut dins de la pestanya 2
            $("#test-swipe-2").empty();
            //Definim els atributs
            let newh1 = $('<h1>'+data[item]["title"]+'</h1>');
            let newsumary = $('<p>'+data[item]["summary"]+'</p>');
            let newimage = $('<img src="'+data[item]["imageUrl"]+'"></img>');
            //Afegim els objectes dins la pestanya 2
            $("#test-swipe-2").append(newh1);
            $("#test-swipe-2").append(newsumary);
            $("#test-swipe-2").append(newimage);
            //Cambiem de pagina
            $('.tabs').tabs('select', "test-swipe-2");
          });
          $("#llistaPrincipal").append(newElement);
        };
      }).fail(function () {
        alert("ERROR");
      });
      });
}