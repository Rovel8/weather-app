"use strict";

var axios = require('axios');

var url = 'http://api.weatherstack.com/current?access_key=67679f0af3ecc2748f91441308ccc805&query=';
var API_KEY_MAPBOX = 'pk.eyJ1IjoicGFzaGFyMSIsImEiOiJja2k3ZTl4NjMwbmptMnNtcWVkcGNzeWg5In0.D2I55yWTh7M22jXElIHIbQ';
var instance = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
});

var getTheCityLocation = function getTheCityLocation(city) {
  var location, result;
  return regeneratorRuntime.async(function getTheCityLocation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(instance.get("".concat(city, ".json?access_token=").concat(API_KEY_MAPBOX, "&limit=1")));

        case 3:
          result = _context.sent;

          if (!(result.status !== 200)) {
            _context.next = 8;
            break;
          }

          throw new Error('Enable to connect to server');

        case 8:
          if (result.data.features.length) {
            _context.next = 12;
            break;
          }

          throw new Error("Unable to find the location. Try another search");

        case 12:
          location = result.data.features[0].center;
          return _context.abrupt("return", location);

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var weatherInTheCity = function weatherInTheCity(city) {
  var location, wetherData;
  return regeneratorRuntime.async(function weatherInTheCity$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (city) {
            _context2.next = 3;
            break;
          }

          throw new Error("There is no location provided. Type in one and try again");

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(getTheCityLocation(city));

        case 5:
          location = _context2.sent;

          if (location) {
            _context2.next = 8;
            break;
          }

          throw new Error('Enable to connect to location services');

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(axios.get(url + "".concat(location[1], ",").concat(location[0])));

        case 10:
          wetherData = _context2.sent;

          if (!wetherData.data.error) {
            _context2.next = 13;
            break;
          }

          throw new Error("There is no city like this in database. Try another one");

        case 13:
          console.log(wetherData.data.current);
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  weatherInTheCity: weatherInTheCity
};