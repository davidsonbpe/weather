var loc, currentTemp, tempFah, weatherDesc;
$(document).ready(function(){
  loc = document.getElementById("location");
  getLocation();
});
$('#change_to').click(function(){
  var unit = $('#unit').text();
  var newUnit = unit == "°C"?"°F":"°C";
  if (newUnit === "°F") {
    tempFah = Math.round(currentTemp*1.8+32);
    $('#temp').text(tempFah);
    $('#unit').text(newUnit);
    $('#change').text(unit);
  }else{
    $('#temp').text(currentTemp);
    $('#unit').text(newUnit);
    $('#change').text(unit);
  }
});

/* ------------------------w3schools demo ------------------------*/
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function getWeather(position){
  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?lat='+position.coords.latitude+'&lon='+position.coords.longitude,
    jsonp: 'json',
    dataType: 'json',
    success: function(response){
      $('#location').text(response.name+", "+response.sys.country);
      currentTemp = response.main.temp;
      $('#temp').text(currentTemp);
      weatherDesc = response.weather[0].description;
      selectAnimation(response.weather[0].main);
    }

  });
}

function selectAnimation(name){
  $('#weather-name').text(name);
  switch(name.toLowerCase()){

    case 'thunderstorm': //trovoada
      addAnimation("stormy", 'jpg');
      break;
    case 'clear': //Claro
      $('#weather-name').text("Clear/Sunny");
      addAnimation("sunny", 'jpg');
      break;
    case 'snow': //neve
      addAnimation("snowy", 'jpg');
      break;
    case 'rain': //chuva
      addAnimation("rainy", 'jpg');
      break;
    case 'drizzle': //chuvisco
      addAnimation("rainy", 'jpg'); //chuvoso
      break;
    default:
      addAnimation("cloudy", 'jpg'); //nublado
      break;
  }		
}
function addAnimation(name, imageFormat){
  $('#weather').addClass(name);
  $('body').css("background-image", "url('./weather-img/"+name+"."+imageFormat+"')");
  //$('body').css("background-image", "url('https://davidsonbpe.github.io/weather/weather-img/"+name+"."+imageFormat+"')");
  $('#weather-desc').text(weatherDesc);
}