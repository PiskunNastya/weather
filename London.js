// Алгоритм:
// 1. При нажатии подаем запрос на сервер
// 2. При получении ответа отрисовываем

// Детально:
// 1. получение доступа к ДОМ элементам
// 2. ставим прослушку-шпиона на кнопку
// 3. подача запроса на сервер
// 4. обработка данных, на наши единицы измерения
// 5. отрисовка на экран

var battonLondon = document.getElementById('button-London');
var humidityLondon = document.querySelector('#current-humidity-London');
var pressureLondon = document.querySelector('#current-pressure-London');
var temperatureLondon = document.querySelector('#current-temperature-London');
var windSpeedLondon = document.querySelector('#current-wind-speed-London');
var weatherLondon = document.querySelector('#weather-London');



function clickOnButtonLondon() {

    fetch('https://api.openweathermap.org/data/2.5/weather?id=2643741&appid=f34de953b08c54e3b8ae792bd011fb79')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // console.log(data);
                displayLondon(data);
            })

}


function displayLondon(data) {
    humidityLondon.innerText = 'Humidity: ' + data.main.humidity + '%';
    pressureLondon.innerText = 'Pressure: ' + hectopascalsToMillimetersOfMercury(data.main.pressure) + 'mm Hg';
    temperatureLondon.innerText = 'Temperature: ' + kelvinToCelsiusLondon(data.main.temp) + '℃';
    windSpeedLondon.innerText = 'Wind speed: ' + data.wind.speed + 'm/s';
    weatherLondon.innerText = data.weather[0].main;
}



function kelvinToCelsiusLondon(kelvinLondon) {
    // console.log(kelvinLondon);
    return (kelvinLondon - 273.15).toFixed(0);
    // методом toFixed убрала все лишние знаки поле точки, округлила, что б всегда показывалась двузначное число
}


function hectopascalsToMillimetersOfMercury(hectopascals) { //гектопаскали в миллиметры ртутного столба
    return (hectopascals / 1333).toFixed(3).substring(2);
    // методом toFixed обрезала все лишние цифры, оставила только 3 первые цифры, после точки
    // методом substring обрезала часть строки, а именно "0."
}



battonLondon.addEventListener('click', clickOnButtonLondon);

// {
//     "id": 2643741,
//     "name": "City of London",
//     "state": "",
//     "country": "GB",
//     "coord": {
//       "lon": -0.09184,
//       "lat": 51.512791
// }