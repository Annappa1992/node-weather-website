const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
const weatherStackURL = "http://api.weatherstack.com/current?access_key=7507e2e3baeaa00d1c1ae1e92c228b29&query=" + latitude + "," + longitude + "&units=f";
request.get({ url: weatherStackURL, json: true }, (error, { body }) => {
    if (error) {
        callback("Unable to connect Weather Service!!", undefined);
    } else if (body.error) {
        callback(body.error.info, undefined);
    } else {
        const current = body.current;
        callback(undefined, current.weather_descriptions[0] + ". It is currently " + current.temperature + " degrees out. It feels like " + current.feelslike + " degrees out. The humidity is " +  current.humidity + "%."  );
    }
});}

module.exports = forecast;