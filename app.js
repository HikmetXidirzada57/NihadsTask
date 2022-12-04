var input = document.querySelector('.input_text');
var myInput = document.querySelector('.myInput')
var myInputL = document.querySelector('.myInputL')
var myInputLit = document.querySelector('.myInputLit')
var lattInput = document.querySelector('.input_textL')

var littInput = document.querySelector('.input_textLit')
var main = document.querySelector('.name');
var temp = document.querySelector('.temp');
var timeZon = document.querySelector('.time')
var desc = document.querySelector('.desc');
var degg = document.querySelector('.degree')
var descMains = document.querySelector('.descMain')
var hum = document.querySelector('.hum');
var speed = document.querySelector('.speed');
var exc = document.querySelector('.exclude');
var button = document.querySelector('.searchName')
var buttonLat = document.querySelector('.searchLat')
var listGroup = document.querySelector(".list-group")
var pressure = document.querySelector('.pressure')

var nameCheck = document.querySelector("#nameCheck")
var latCheck = document.querySelector("#latCheck")
var litCheck = document.querySelector("#litCheck")

//////checkbox functions////////////////

nameCheck.addEventListener('click', () => {
  if (nameCheck.checked == true) {
    myInput.classList.add('activeInput')
  } else {
    myInput.classList.remove('activeInput')
  }
})

latCheck.addEventListener('click', () => {
  if (latCheck.checked == true) {
    myInputL.classList.add('activeInput')
    myInputLit.classList.add('activeInput')
    buttonLat.classList.add("activeBtn")

  } else {
    myInputL.classList.remove('activeInput')
    myInputLit.classList.remove('activeInput')
    buttonLat.classList.remove("activeBtn")
  }
})


///////////////////////

///// byname searching ecent/////
button.addEventListener('click', async () => {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=?&lon=?&exclude=?&q=${input.value}&appid=50a7aa80fa492fa92e874d23ad061374`)
    .then(response => response.json())
    .then(data => {

      var nameValue = data.name;
      var times = data.dt;
      var tempValue = data.main.temp;
      var tempMaxValue = data.main.temp_max;
      var tempMinValue = data.main.temp_min;
      var descValue = data.weather[0].description
      var descMain = data.weather[0].main
      var humidity = data.main.humidity
      var windspeed = data.wind.speed
      var press = data.main.pressure
      var deg = data.wind.deg

      main.innerHTML = nameValue;
      desc.innerHTML = "Description - " + descValue;
      temp.innerHTML = "Temp - " + `${tempValue}°F` + ` Max temperature:  ${tempMaxValue} °F` + ` Min temperature:  ${tempMinValue} °F`;
      hum.innerHTML = "Humidity -" + ` ${humidity}%`;
      speed.innerHTML = "Wind speed -" + `${windspeed}m/s`;
      pressure.innerHTML = 'Pressure -' + press
      descMains.innerHTML = 'Contidion -' + descMain
      timeZon.innerHTML = 'Time -  ' + `${timeFind(times)}`
      degg.innerHTML = 'Direction - ' + `${findDegree(deg)}`
      listGroup.classList.add("active")
      input.value = "";
    })

    .catch(err => alert("Wrong city name or etc", err));
})
////////////////////

buttonLat.addEventListener('click', () => {
  fixLatLon()
})

function fixLatLon() {
  if (lattInput.value.trim() && littInput.value.trim()) {
    getLanLot(lattInput.value, littInput.value)
  } else {
    alert("something went wrong !")
  }
}


// by Latt searching///

async function getLanLot(lat, lon) {
  await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric=?&lat=${lat}&lon=${lon}&appid=50a7aa80fa492fa92e874d23ad061374`).
  then((e) => e.json())
    .then(data => {
      var nameValue = data.name;
      var times = data.dt;
      var tempValue = data.main.temp;
      var tempMaxValue = data.main.temp_max;
      var tempMinValue = data.main.temp_min;
      var descValue = data.weather[0].description
      var descMain = data.weather[0].main
      var humidity = data.main.humidity
      var windspeed = data.wind.speed
      var press = data.main.pressure
      var deg = data.wind.deg
      main.innerHTML = nameValue;
      desc.innerHTML = "Description - " + descValue;
      temp.innerHTML = "Temp - " + `${tempValue}°F` + ` Max temperature:  ${tempMaxValue} °F` + ` Min temperature:  ${tempMinValue} °F`;
      hum.innerHTML = "Humidity -" + ` ${humidity}%`;
      speed.innerHTML = "Wind speed -" + `${windspeed}m/s`;
      pressure.innerHTML = 'Pressure -' + press
      descMains.innerHTML = 'Contidion -' + descMain
      timeZon.innerHTML = 'Time -  ' + `${timeFind(times)}`
      degg.innerHTML = 'Direction - ' + `${findDegree(deg)}`

      listGroup.classList.add("active")
      myInputL.value = "";
      myInputLit.value = "";
    });
}

function timeFind(time) {
  let currentTime = new Date(time * 1000)
  return currentTime.toLocaleTimeString("it-IT")
}

// Get Location///////
var geo = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    geo.innerHTML = "Geolocation is not supported by this browser.";
  }
}
//////////////////////////


function findDegree(deg) {
  if (deg <= 90) {
    return 'east';
  } else if (deg <= 180) {
    return 'south'
  } else if (deg <= 270) {
    return 'west'
  } else {
    return 'north'
  }
}

async function showPosition(position) {
  geo.classList.toggle("active-alert")
  await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=50a7aa80fa492fa92e874d23ad061374`)
    .then(res => res.json()).then(data => {
      console.log(data);
      geo.style.fontFamily = "Gill Sans Extrabold";
      geo.innerHTML = "Latitude: " + `<strong>${position.coords.latitude}</strong>` +
        "<br>Longitude: " + `<strong>${position.coords.longitude}</strong>` +
        "<br> Country name : <strong>Azerbaijan</strong>" +
        "<br> Name of City: " + `<strong>${data.name }</strong>` +
        "<br> Country code: " + `<strong>${data.cod}</strong>` +
        "<br> Weather condition: " + `<strong>${data.weather[0].main}</strong>` + " ," + ` 
        <strong>${data.weather[0].description}</strong>` +
        "<br> Wind speed :" + `<strong>${data.wind.speed }</strong>` +
        "<br> Pressure :" + `<strong>${data.main.pressure}</strong <br>` +
        "<br> Humidity :" + ` <strong>${data.main.humidity} %</strong>`;
    })
}