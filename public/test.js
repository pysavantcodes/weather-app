 const fetchedLocation = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Lagos&limit=5&appid=d5bc5b2978ccf503c918012f8fa15f23");

 const fetchedWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d5bc5b2978ccf503c918012f8fa15f23")