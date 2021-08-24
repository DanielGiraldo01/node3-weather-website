const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=348629c902cfb7b9744e973d76ea44bc&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const data = body;
      const { current } = data;
      const { temperature, feelslike, humidity, weather_descriptions } =
        current;

      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
