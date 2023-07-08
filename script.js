const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const chartContainer = document.getElementById('chart-container');
let chart;

async function checkWeather(city, lat, lon) {
  const api_key = "4acdd3b0436f01f7a1ee831a1029b355";
  let url;
  
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  } else if (lat && lon) {
    url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${api_key}`;
  } else {
    console.log("Invalid input");
    return;
  }
  
  const weatherData = await fetch(url).then(response => response.json());

  temperature.innerHTML = `${Math.round(weatherData.main.temp - 271.15)}°C`;
  description.innerHTML = weatherData.weather[0].description;
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}km/H`;

  // Create or update the chart
  chart = Highcharts.chart('chart-container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Weather Data',
      align: 'left'
    },
    xAxis: {
      categories: ['Temperature', 'Humidity', 'Wind Speed']
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Value',
      data: [
        { name: 'Temperature', y: Math.round(weatherData.main.temp - 271.15) },
        { name: 'Humidity', y: weatherData.main.humidity },
        { name: 'Wind Speed', y: weatherData.wind.speed }
      ]
    }]
  });
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value;
  checkWeather(city);
});