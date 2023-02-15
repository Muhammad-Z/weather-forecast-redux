import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getCurrentWeather } from "../api-owm/callAPI"

export default function CurrentWeather(/* { forecastCtx } */) {
  const location = useSelector((state) => state.location.value);
  const currentWeather = useSelector((state) => state.currentWeather.value);
  const dispatch = useDispatch()

  useEffect(() => {

    if (location) {
      console.log('da loc is ', location)
      getCurrentWeather({ lat: location.lat, lon: location.lon }).then(res =>
        dispatch({
          type: 'currentWeather/loadCurrentWeather', payload:
            res
        })
      )
    }
  }, [location])

  return (currentWeather && <div className="current-container">
    <div className="date-location-container">

    </div>
    <div className="icon-temp-container"><i className={`cw-icon ${currentWeather.icon}`}></i> <span className='cw-temp'>{currentWeather.temp}°C</span></div>
    <div className="description-container">Feels like {currentWeather.feels_like}°C. {currentWeather.description}</div>
    <ul className="weather-items"><li><i className='cw-item-icon wi cw-wind-icon'>{currentWeather.wind.icon}</i> {currentWeather.wind.speed}Km/h </li>
      <li><i className="cw-item-icon wi wi-humidity"></i>humidity: {currentWeather.humidity}% </li><li><i className="cw-item-icon">👀</i> Visibility: {Math.round(currentWeather.visibility / 1000)}Km</li></ul>
    {/*     <p>{cw && cw.description}</p> */}
  </div>)
}
