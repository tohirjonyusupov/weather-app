const API = '666f09cb61f24b13aac45021241312';
const city = 'Tashkent'
const container = document.querySelector('.container')
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

cities.forEach(city => {
  document.getElementById('city-select').innerHTML += `
    <option value="${city}">${city}</option>
  `
})


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getWeather(city) {
  axios.get(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${API}`).then((response) => {
    const location = response.data.location
    const current = response.data.current
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
        <h1 class="weather-temp">${Math.floor(current.temp_c)}°C</h1>
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
  })
}
getWeather(city)


document.getElementById('city-select').addEventListener('change', (e) => {
  getWeather(e.target.value)
}) 