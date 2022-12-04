var input = document.querySelector('.input_text');
var main = document.querySelector('.name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var hum = document.querySelector('.lat');
var speed = document.querySelector('.lit');
var exc = document.querySelector('.exclude');
var button = document.querySelector('.submit')
var listGroup = document.querySelector(".list-group")
var list=document.querySelector('.list')// let url = ;
button.addEventListener('click', () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=?&lon=?&exclude=?&q=${input.value}&appid=50a7aa80fa492fa92e874d23ad061374`)
    .then(response => response.json())
    .then(data => {

   for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      console.log(data,key);
      list.innerHTML=element
    }
   }
      var tempValue = data.main.temp;
      var nameValue = data.name;
      var descValue = data.weather[0].description
      var humidity = data.main.humidity
      var windspeed = data.wind.speed

      main.innerHTML = nameValue;
      desc.innerHTML = "Description - " + descValue;
      temp.innerHTML = "Temp - " + tempValue;
      hum.innerHTML = "Humidity -" + humidity;
      speed.innerHTML = "Wind speed -" + windspeed;
      listGroup.classList.add("active")
      input.value = "";
    })

    .catch(err => alert("Wrong city name or etc", err));
})

var geo = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    geo.innerHTML = "Geolocation is not supported by this browser.";
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
        "<br> Country name : <strong>Azerbaijan</strong>" + "<br> Name of City: " + `<strong>${data.name }</strong>` +
        "<br> Country code: " + `<strong>${data.cod}</strong>` +
        "<br> Weather condition: " + `<strong>${data.weather[0].main}</strong>` + " ," + ` 
        <strong>${data.weather[0].description}</strong>` +
        "<br> Wind speed :" + `<strong>${data.wind.speed }</strong>` +
        "<br> Pressure :" + `<strong>${data.main.pressure}</strong <br>` +
        "<br> Humidity :" + ` <strong>${data.main.humidity}</strong>`;
    })
}