//function serilizesomething
//function serilizeanotherthing
//lol lol lol

/* 
for each city in city search response (array of objects) I need:
key
EnglishName
LocalizedName
country.LocalizedName
country.EnglishName */

export function serializeCities(res) {
  console.log(res);
  return (
    res.data.map(elem => ({
      /*  key: elem.key, */
      loc: {
        lat: elem.lat,
        lon: elem.lon,
      },
      name: elem.name,
      /* localizedName: elem.LocalizedName, */
      country: {
        name: elem.country,
        /*  localizedName: elem.country.LocalizedName, */
      }
    }))
  )
}

export function serializeCurrentWeather(res) {
  var windIcon = (deg) => {
    switch (deg) {
      case 0: case 360: return '';
      case 90: return '';
      case 180: return '';
      case 270: return '';
      default: {
        if (deg < 90) return '';
        if (deg < 180) return '';
        if (deg < 270) return '';
        if (deg < 360) return '';
      }
    }
  }

  return ({
    description: res.weather[0].description,
    icon: serializeIcons(res.weather[0].id, res.weather[0].icon),
    temp: res.main.temp,
    feels_like: res.main.feels_like,
    humidity: res.main.humidity,
    visibility: res.visibility,
    wind: {
      speed: Math.round(res.wind.speed * 36) / 10,
      deg: res.wind.deg,
      icon: windIcon(res.wind.deg),
    }
  })
}


/* for fiveDays forecast response (object) I need:
DailyForecast (array of 5 objects)
  Date
  Temperature.Minimum {Value, Unit}
  same for Maximum
  Day {Icon, IconPhrase, PrecipitationType, PrecipitationIntensity}
  Same for Night

  Sources
  Link
*/


/* make animation to move periodically and show day/night info */


/* each day is an object: {date, temp, humidity, rain} 
each attribute (except the date) is an array each index represent a 3 hours */

export function serializefiveDays(data) {
  console.log('tho the data is ', data)
  const arr = [];
  data.data.list.map(elem => {
    const unixTime = new Date(0);
    const dayDate = elem.dt_txt.split(" ")[0];
    unixTime.setUTCSeconds(elem.dt);
    let day = unixTime.toLocaleDateString("en-us", { weekday: 'long' });

    if (arr[arr.length - 1]?.date !== dayDate) { //create new entry
      arr.push({
        date: dayDate, epoch: day, temp_avg: 0, time: [],
        weather: { d: { icon: '0' }, n: { icon: '0' } },
        temp: { max: -Infinity, min: +Infinity, list: [] },
        rain: { max: -Infinity, min: +Infinity, list: [] },
        humidity: { max: -Infinity, min: +Infinity, list: [] },
        wind: { max: -Infinity, min: +Infinity, list: [] }, list: []
      })
    }

    const lastArrIndex = arr.length - 1;




    //else append to it

    let rain = elem?.rain ? elem.rain["3h"] : 0;
    const curListLeng = arr[lastArrIndex].list.length;
    arr[lastArrIndex].temp_avg = Math.round(
      ((arr[lastArrIndex].temp_avg * curListLeng)
        + elem.main.temp) * 10 / (curListLeng + 1)) / 10;

    arr[lastArrIndex].temp.list.push(Math.round(elem.main.temp * 10) / 10);
    if (elem.main.temp > arr[lastArrIndex].temp.max) arr[lastArrIndex].temp.max = elem.main.temp;
    if (elem.main.temp < arr[lastArrIndex].temp.min) arr[lastArrIndex].temp.min = elem.main.temp;

    let resWindSpeed = Math.round(elem.wind.speed * 36) / 10;
    arr[lastArrIndex].wind.list.push({
      speed: resWindSpeed,
      direction: elem.wind.deg,
    });
    if (resWindSpeed > arr[lastArrIndex].wind.max) arr[lastArrIndex].wind.max = resWindSpeed;
    if (resWindSpeed < arr[lastArrIndex].wind.min) arr[lastArrIndex].wind.min = resWindSpeed;

    arr[lastArrIndex].humidity.list.push(elem.main.humidity);
    if (elem.main.humidity > arr[lastArrIndex].humidity.max) arr[lastArrIndex].humidity.max = elem.main.humidity;
    if (elem.main.humidity < arr[lastArrIndex].humidity.min) arr[lastArrIndex].humidity.min = elem.main.humidity;

    arr[lastArrIndex].rain.list.push(rain);
    if (rain > arr[lastArrIndex].rain.max) arr[lastArrIndex].rain.max = rain;
    if (rain < arr[lastArrIndex].rain.min) arr[lastArrIndex].rain.min = rain;

    arr[lastArrIndex].time.push(`${unixTime.getUTCHours()}:${unixTime.getUTCMinutes()}`);

    //set icon
    let icn = elem.weather[0].icon;
    if (icn.substr(0, 2) > arr[lastArrIndex].weather[icn.substr(2)].icon)
      arr[lastArrIndex].weather[icn.substr(2)].icon = icn
  })
  console.log('now arr is ', arr)
  return arr;
}

function serializeIcons(code, iconCode) {
  const parse = {
    "200": {
      "label": "thunderstorm with light rain",
      "icon": "storm-showers"
    },

    "201": {
      "label": "thunderstorm with rain",
      "icon": "storm-showers"
    },

    "202": {
      "label": "thunderstorm with heavy rain",
      "icon": "storm-showers"
    },

    "210": {
      "label": "light thunderstorm",
      "icon": "storm-showers"
    },

    "211": {
      "label": "thunderstorm",
      "icon": "thunderstorm"
    },

    "212": {
      "label": "heavy thunderstorm",
      "icon": "thunderstorm"
    },

    "221": {
      "label": "ragged thunderstorm",
      "icon": "thunderstorm"
    },

    "230": {
      "label": "thunderstorm with light drizzle",
      "icon": "storm-showers"
    },

    "231": {
      "label": "thunderstorm with drizzle",
      "icon": "storm-showers"
    },

    "232": {
      "label": "thunderstorm with heavy drizzle",
      "icon": "storm-showers"
    },

    "300": {
      "label": "light intensity drizzle",
      "icon": "sprinkle"
    },

    "301": {
      "label": "drizzle",
      "icon": "sprinkle"
    },

    "302": {
      "label": "heavy intensity drizzle",
      "icon": "sprinkle"
    },

    "310": {
      "label": "light intensity drizzle rain",
      "icon": "sprinkle"
    },

    "311": {
      "label": "drizzle rain",
      "icon": "sprinkle"
    },

    "312": {
      "label": "heavy intensity drizzle rain",
      "icon": "sprinkle"
    },

    "313": {
      "label": "shower rain and drizzle",
      "icon": "sprinkle"
    },

    "314": {
      "label": "heavy shower rain and drizzle",
      "icon": "sprinkle"
    },

    "321": {
      "label": "shower drizzle",
      "icon": "sprinkle"
    },

    "500": {
      "label": "light rain",
      "icon": "rain"
    },

    "501": {
      "label": "moderate rain",
      "icon": "rain"
    },

    "502": {
      "label": "heavy intensity rain",
      "icon": "rain"
    },

    "503": {
      "label": "very heavy rain",
      "icon": "rain"
    },

    "504": {
      "label": "extreme rain",
      "icon": "rain"
    },

    "511": {
      "label": "freezing rain",
      "icon": "rain-mix"
    },

    "520": {
      "label": "light intensity shower rain",
      "icon": "showers"
    },

    "521": {
      "label": "shower rain",
      "icon": "showers"
    },

    "522": {
      "label": "heavy intensity shower rain",
      "icon": "showers"
    },

    "531": {
      "label": "ragged shower rain",
      "icon": "showers"
    },

    "600": {
      "label": "light snow",
      "icon": "snow"
    },

    "601": {
      "label": "snow",
      "icon": "snow"
    },

    "602": {
      "label": "heavy snow",
      "icon": "snow"
    },

    "611": {
      "label": "sleet",
      "icon": "sleet"
    },

    "612": {
      "label": "shower sleet",
      "icon": "sleet"
    },

    "615": {
      "label": "light rain and snow",
      "icon": "rain-mix"
    },

    "616": {
      "label": "rain and snow",
      "icon": "rain-mix"
    },

    "620": {
      "label": "light shower snow",
      "icon": "rain-mix"
    },

    "621": {
      "label": "shower snow",
      "icon": "rain-mix"
    },

    "622": {
      "label": "heavy shower snow",
      "icon": "rain-mix"
    },

    "701": {
      "label": "mist",
      "icon": "sprinkle"
    },

    "711": {
      "label": "smoke",
      "icon": "smoke"
    },

    "721": {
      "label": "haze",
      "icon": "day-haze"
    },

    "731": {
      "label": "sand, dust whirls",
      "icon": "cloudy-gusts"
    },

    "741": {
      "label": "fog",
      "icon": "fog"
    },

    "751": {
      "label": "sand",
      "icon": "cloudy-gusts"
    },

    "761": {
      "label": "dust",
      "icon": "dust"
    },

    "762": {
      "label": "volcanic ash",
      "icon": "smog"
    },

    "771": {
      "label": "squalls",
      "icon": "day-windy"
    },

    "781": {
      "label": "tornado",
      "icon": "tornado"
    },

    "800": {
      "label": "clear sky",
      "icon": "sunny"
    },

    "801": {
      "label": "few clouds",
      "icon": "cloudy"
    },

    "802": {
      "label": "scattered clouds",
      "icon": "cloudy"
    },

    "803": {
      "label": "broken clouds",
      "icon": "cloudy"
    },

    "804": {
      "label": "overcast clouds",
      "icon": "cloudy"
    },


    "900": {
      "label": "tornado",
      "icon": "tornado"
    },

    "901": {
      "label": "tropical storm",
      "icon": "hurricane"
    },

    "902": {
      "label": "hurricane",
      "icon": "hurricane"
    },

    "903": {
      "label": "cold",
      "icon": "snowflake-cold"
    },

    "904": {
      "label": "hot",
      "icon": "hot"
    },

    "905": {
      "label": "windy",
      "icon": "windy"
    },

    "906": {
      "label": "hail",
      "icon": "hail"
    },

    "951": {
      "label": "calm",
      "icon": "sunny"
    },

    "952": {
      "label": "light breeze",
      "icon": "cloudy-gusts"
    },

    "953": {
      "label": "gentle breeze",
      "icon": "cloudy-gusts"
    },

    "954": {
      "label": "moderate breeze",
      "icon": "cloudy-gusts"
    },

    "955": {
      "label": "fresh breeze",
      "icon": "cloudy-gusts"
    },

    "956": {
      "label": "strong breeze",
      "icon": "cloudy-gusts"
    },

    "957": {
      "label": "high wind, near gale",
      "icon": "cloudy-gusts"
    },

    "958": {
      "label": "gale",
      "icon": "cloudy-gusts"
    },

    "959": {
      "label": "severe gale",
      "icon": "cloudy-gusts"
    },

    "960": {
      "label": "storm",
      "icon": "thunderstorm"
    },

    "961": {
      "label": "violent storm",
      "icon": "thunderstorm"
    },

    "962": {
      "label": "hurricane",
      "icon": "cloudy-gusts"
    }
  }
  var prefix = 'wi wi-';
  var icon = parse[code].icon;


  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  return (prefix + icon);
}