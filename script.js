const API = '666f09cb61f24b13aac45021241312';
const container = document.querySelector('.container')
const footer = document.querySelector('.footer')
const cities = [
  "Tashkent",
  "New York City",
  "Tokyo",
  "London",
  "Los Angeles",
  "Paris",
  "Shanghai",
  "Berlin",
  "Mexico City",
  "Sydney",
  "Mumbai",
  "Seoul",
  "São Paulo",
  "Dubai",
  "Rio de Janeiro",
  "Istanbul",
  "Buenos Aires",
  "Moscow",
  "Bangkok",
  "Cairo",
  "Lagos"
];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

cities.forEach((city) => {
  document.getElementById('city-select').innerHTML += `
    <option value="${city}">${city}</option>
  `
})



function getWeather(city = 'Tashkent') {
  axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API}&days=7`).then((response) => {
    addOption(response.data.forecast.forecastday)
    displayCurrentWeather(response.data.current, response.data.location, response)
  })
}
getWeather()

function displayCurrentWeather(current, location, response) {
    const time = new Date(current.last_updated)
    const currentDay = time.getDate()
    const currentDayName = daysOfWeek[time.getDay()]
    const currentMonth = shortMonths[time.getMonth()]
    const currentYear = time.getFullYear()
    
    container.innerHTML = `
      <div class="weather-side">
      <div class="weather-gradient"></div>
      <div class="date-container">
        <h2 class="date-dayname">${currentDayName}</h2><span class="date-day">${currentDay} ${currentMonth} ${currentYear}</span><i class="location-icon" data-feather="map-pin"></i><span class="location">${location.name}</span>
      </div>
      <div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
        <h1 class="weather-temp">${current.temp_c}°C</h1>
        <h3 class="weather-desc">${current.condition.text}</h3>
      </div>
    </div>
    <div class="info-side">
      <div class="today-info-container">
        <div class="today-info">
          <div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">${current.precip_mm} %</span>
            <div class="clear"></div>
          </div>
          <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">${current.humidity} %</span>
            <div class="clear"></div>
          </div>
          <div class="wind"> <span class="title">WIND</span><span class="value">${current.wind_kph} km/h</span>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
    ` 
    displayHourlyWeather(response.data.forecast.forecastday[0])
    document.querySelectorAll('#date').forEach(date => {
      date.addEventListener('click', (e) => {
        displayForecastWeather(response.data.forecast.forecastday[e.target.value], response.data.location)
        displayHourlyWeather(response.data.forecast.forecastday[e.target.value])
      })
    })
}
function displayHourlyWeather(forecast) {
  footer.innerHTML = ''
  for (let i = 0; i < forecast.hour.length; i += 3) {
    const h = forecast.hour[i]
    footer.innerHTML += `
    <div><img src="${h.condition.icon}" alt="a\">
      <p class="degree">${h.temp_c}°C</p><span class="hour">${h.time.slice(-5)}</span>
    </div>
    `
  }
}
function displayForecastWeather(forecast, location) {
  container.innerHTML = ''
  
  const time = new Date(forecast.date)
    const currentDay = time.getDate()
    const currentDayName = daysOfWeek[time.getDay()]
    const currentMonth = shortMonths[time.getMonth()]
    const currentYear = time.getFullYear()
    
    container.innerHTML = `
      <div class="weather-side">
      <div class="weather-gradient"></div>
      <div class="date-container">
        <h2 class="date-dayname">${currentDayName}</h2><span class="date-day">${currentDay} ${currentMonth} ${currentYear}</span><i class="location-icon" data-feather="map-pin"></i><span class="location">${location.name}</span>
      </div>
      <div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
        <h1 class="weather-temp">${forecast.day.avgtemp_c}°C</h1>
        <h3 class="weather-desc">${forecast.day.condition.text}</h3>
      </div>
    </div>
    <div class="info-side">
      <div class="today-info-container">
        <div class="today-info">
          <div class="precipitation"> <span class="title">PRECIPITATION</span><span class="value">${forecast.hour[0].precip_mm} %</span>
            <div class="clear"></div>
          </div>
          <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">${forecast.hour[0].humidity} %</span>
            <div class="clear"></div>
          </div>
          <div class="wind"> <span class="title">WIND</span><span class="value">${forecast.hour[0].wind_kph} km/h</span>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      
    </div>
    ` 
}
function addOption(forecastDay) {
  forecastDay.forEach((day,index) => {
    document.querySelector('#date-select').innerHTML += `
      <option value="${index}" id="date">${day.date.slice(-2)}</option>
    `
  })
}

document.getElementById('city-select').addEventListener('change', (e) => {
  getWeather(e.target.value)
})




