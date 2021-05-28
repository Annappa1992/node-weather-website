const request = require('postman-request');
const geocode = (address, callback) => {
    const geoLocationURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2hyZWUta3Jpc2huYSIsImEiOiJja3AxMGFqb2MwdDFlMnBuenpiMjc4bDVpIn0.xpG4yZfBanxK7SQtUfLaZA&limit=1";

    request.get({ url: geoLocationURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location! Please try another search!!", undefined);
        } else {
            const features = body.features[0];
            var data = {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;