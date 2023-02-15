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

export function serializeCities(data) {
  return (
    data.map(elem => ({
      key: elem.key,
      englishName: elem.EnglishName,
      localizedName: elem.LocalizedName,
      country: {
        englishName: elem.country.EnglishName,
        localizedName: elem.country.LocalizedName,
      }
    }))
  )
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

export function serializefiveDays(data) {
  return (data.DailyForecasts.map(dayData => ({
    date: dayData.EpochDateTime,
    temperature: {
      minimum: dayData.Temperature.Minimum,
      maximum: dayData.Temperature.Maximum,
      average: (dayData.Temperature.Minimum + dayData.Temperature.Maximum) / 2,
      unit: dayData.Temperature.Minimum.Unit,
    },
    day: {
      icon: dayData.Day.Icon,
      iconPhrase: dayData.Day.IconPhrase,
      precipitationType: dayData.Day.PrecipitationType,
      precipitationIntensity: dayData.Day.PrecipitationIntensity,
    },
    night: {
      icon: dayData.Night.Icon,
      iconPhrase: dayData.Night.IconPhrase,
      precipitationType: dayData.Night.PrecipitationType,
      precipitationIntensity: dayData.Night.PrecipitationIntensity,
    },
  })))
}