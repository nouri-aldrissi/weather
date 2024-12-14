const apiKey = "796c0182df8a4fcfb64133417241312";
let country = "Cairo"; 
const baseAPI = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3`; 

// getWeather-API
async function getWeather(country) {
  const API = `${baseAPI}&q=${country}`;
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Error fetching weather data");
    }
    const {forecast} = await response.json();
    console.log(forecast.forecastday);
    
    displayWeather(forecast.forecastday);

  } catch (error) {
    console.log(error.message);
  }
}
// getWeather-API END

// displayWeather
function displayWeather(list) {
  let blakBox = '';

  let day = list[0];
  let date = new Date(day.date);

  blakBox += `
    <div class="col-lg-4  col-sm-12 px-1">
      <div class="card border-success h-100">
        <div class="container">
          <div class="card-header border-success d-flex justify-content-between">
            <h2 class="fa-1x">${date.toLocaleString('en', { weekday: 'long' })}</h2>
            <h3 class="fa-1x">${date.getDate()} ${date.toLocaleString('en', { month: 'long' })}</h3>
          </div>
          <div class="card-body text-success">
            <h3 class="card-title text-white">${country}</h3>
            <h4 class="card-text fa-5x text-white">${day.day.avgtemp_c} <sup>o</sup>C</h4>
          </div>
          <div class="img-fluid img">
            <img src="https:${day.day.condition.icon}" alt="" width="90">
            <p class="card-text p-2">${day.day.condition.text}</p>
          </div>
          <div class="card-footer bg-transparent border-success">
            <span><i class="fa-solid fa-umbrella p-2"></i>${day.day.daily_chance_of_rain}%</span>
            <span><i class="fa-solid fa-wind p-2"></i> ${day.day.maxwind_kph} km/h</span>
            <span><i class="fa-solid fa-compass p-2"></i>East</span>
          </div>
        </div>
      </div>
    </div>
  `;

  for (let i = 1; i < list.length; i++) {
    let day = list[i];
    let date = new Date(day.date);

    blakBox += `
      <div class="col-lg-4  col-sm-12 px-1">
        <div class="card border-success h-100 d-flex justify-content-center align-items-center">
          <div class="container">
            <h2 class="fa-2x text-center">${date.toLocaleString('en', { weekday: 'long' })}</h2>
            <div class="card-body text-success d-flex flex-column align-items-center justify-content-center">
              <img src="https:${day.day.condition.icon}" alt="" width="90">
              <h4 class="card-text fa-3x text-white">${day.day.avgtemp_c} <sup>o</sup>C</h4>
              <h5 class="card-text fa-1x text-white">${day.day.mintemp_c} <sup>o</sup>C</h5>
              <p class="card-text p-2 text-center">${day.day.condition.text}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("tableWeather").innerHTML = blakBox;
}
// displayWeather-END

// querySelector
document.querySelector('#btnSearch').addEventListener('click', function() {
  const city = document.querySelector('#inpotSearch').value;
  if (city) {
    country = city;
    getWeather(country); 
  }
});
// querySelector-END
getWeather(country); 