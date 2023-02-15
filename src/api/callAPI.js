//controller
/* import api from './api';*/
import { useForecastDispatch } from "../ForecastContext.jsx";
import { serializefiveDays } from './serializer';


export function getCities(options) {
  const dispatch = useForecastDispatch();

  return (
    api.get(`http://dataservice.accuweather.com/locations/v1/cities/search
    ?q=${options.city_name}`).then(res => serializeCities(res))
      .then(data => dispatch({
        type: 'load',
        payload: data
      }))
  )
}

/* export function getCurrentWeather(options) {
  const dispatch = useForecastDispatch();

  return (
    api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name},${country_code}`)
      .then(res => serializeCurrentWeather(res)))
} */

export function getfiveDays(options) {

  /*   return (api.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`)
      .then(res => serializefiveDays(res)) */

  return (serializefiveDays({

    "Headline": {
      "EffectiveDate": "2023-01-01T13:00:00+00:00",
      "EffectiveEpochDate": 1672578000,
      "Severity": 4,
      "Text": "Expect showery weather Sunday afternoon through Monday morning",
      "Category": "rain",
      "EndDate": "2023-01-02T13:00:00+00:00",
      "EndEpochDate": 1672664400,
      "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?lang=en-us",
      "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2023-01-01T07:00:00+00:00",
        "EpochDate": 1672556400,
        "Temperature": {
          "Minimum": {
            "Value": 44,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 55,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 12,
          "IconPhrase": "Showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 12,
          "IconPhrase": "Showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&lang=en-us"
      },
      {
        "Date": "2023-01-02T07:00:00+00:00",
        "EpochDate": 1672642800,
        "Temperature": {
          "Minimum": {
            "Value": 38,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 48,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 35,
          "IconPhrase": "Partly cloudy",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&lang=en-us"
      },
      {
        "Date": "2023-01-03T07:00:00+00:00",
        "EpochDate": 1672729200,
        "Temperature": {
          "Minimum": {
            "Value": 53,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 54,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 14,
          "IconPhrase": "Partly sunny w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 12,
          "IconPhrase": "Showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&lang=en-us"
      },
      {
        "Date": "2023-01-04T07:00:00+00:00",
        "EpochDate": 1672815600,
        "Temperature": {
          "Minimum": {
            "Value": 47,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 58,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 12,
          "IconPhrase": "Showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&lang=en-us"
      },
      {
        "Date": "2023-01-05T07:00:00+00:00",
        "EpochDate": 1672902000,
        "Temperature": {
          "Minimum": {
            "Value": 46,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 55,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 6,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&lang=en-us"
      }
    ]
  })
  )

}