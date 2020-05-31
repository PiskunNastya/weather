// Логика:
// 1. get DOM element / добираемся к ДОМ элементам
// 2. add event listener / добавляем шпиона
// 3. get current location / узнаем наше текущее местонахождение
// 4. http request / при нажатии кнопки, на основании нашего текущего положения, выпорлниться http запрос
// 5. transform data / преобразование данных, например с цельсий в фаренгейт
// 6. display data / отрисовываем текущии данные


// 1. Найти геолокацию
// 2. Сделать http запрос
// 3. Отобразить


var humidity; // влажность
var pressure; // давление
var temperature;
var windSpeed;
var myCity; // cводка погоды

function getElement(id) {
    return document.getElementById(id);
}

window.onload = function() {
    humidity = getElement('current-humidity-myCity');
    pressure = getElement('current-pressure-myCity');
    temperature = getElement('current-temperature-myCity');
    windSpeed = getElement('current-wind-speed-myCity');
    myCity = getElement('myGeolocation'); 
    weatherSummary = getElement('weather-myCity');
}

// 1. Найти геолокацию
// Функция срабативает по клику на кнопку
function getWeather() {                                                             
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(geolocationPosition ) {
            var lat = geolocationPosition.coords.latitude; // широта
            var long = geolocationPosition.coords.longitude; // долгота
            getRemoteWeatherData(lat, long);
        }); 
    } else {
        alert('This browser does not support navigation.geolocation!');
    }
}


function getRemoteWeatherData(lat, long) {                                                   // 2. Сделать http запрос
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + 'f34de953b08c54e3b8ae792bd011fb79')
        .then(function(response) {
            return response.json(); // трансформировал данные, вытянул их с формата JSON
        })
        .then(function(data) {  // потом возвращяем данные
            // console.log(data);
            displayWeather(data); // передаем данные (объект) в функцию которая отрысовывает данные на экран
        })

}



function displayWeather(data) {                                                         // 3. Отобразить
    humidity.innerText = 'Humidity: ' + data.main.humidity + '%';
    temperature.innerText = 'Temperature: ' + kelvinToCelsius(data.main.temp) + '℃';
    pressure.innerText = 'Pressure: ' + hectopascalsToMillimetersOfMercury(data.main.pressure) + 'mm Hg';
    windSpeed.innerText = 'Wind Speed: ' + data.wind.speed + 'm/s';
    myCity.innerText =  data.name;
    weatherSummary.innerText = data.weather[0].main;
    // console.log(data.main.temp);
}


function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
}


function hectopascalsToMillimetersOfMercury(hectopascals) { //гектопаскали в миллиметры ртутного столба
    return (hectopascals / 1333).toFixed(3).substring(2);
}