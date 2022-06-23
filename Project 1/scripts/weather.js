const getTodayForecast = () => {
    fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast')
       .then((rs) => rs.json())
       .then(data => {
        const todayForecast = data.items[0].forecasts[0];
        const marquee = document.querySelector('#marquee')
        marquee.innerHTML = 
        "<b>Today's Forecast:</b> "+todayForecast.forecast+'&emsp;'
        +"<b>Relative Humidity:</b> Low-"+todayForecast.relative_humidity.low+'% '+'High-'+todayForecast.relative_humidity.high+'%'+'&emsp;'
        +"<b>Temperature:</b> Min-"+todayForecast.temperature.low+'&#8451; '+'Max-'+todayForecast.temperature.high+'&#8451;'+'&emsp;'
        +"<b>Wind:</b> "+todayForecast.wind.speed.low+'-'+todayForecast.wind.speed.high+'km/h, '+todayForecast.wind.direction;
      });
  }

