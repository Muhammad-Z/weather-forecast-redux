import { useEffect, useState } from 'react';
import { getCities, getReverseGeo } from '../api-owm/callAPI';
import SearchList from './SearchList';
import darkIcon from './dark-icon.png';
import lightIcon from './light-icon.png';
import LocationInfo from './LocationInfo';
import HtmlGeo from './HtmlGeo';
import CurrentWeather from './CurrentWeather';

import { useDispatch, useSelector } from 'react-redux';

export default function Header({setTheme} ) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.value)

  let delayTimer;
  const [cityQuery, setCityQuery] = useState(false);
  const [cityList, setCityList] = useState(false);
  const [listRenderKey, setListRenderKey] = useState(Date('now'));

  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadPosition);
    }
    function loadPosition(position) {
      getReverseGeo({ lat: position.coords.latitude, lon: position.coords.longitude }).then(
        res => dispatch({
          type: 'location/loadLocation', payload: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: res.data[0].state,
            country: res.data[0].country,
          }
        })
      )
    }
  }, [])

  useEffect(() => {
    console.log('idk if you working')
    if (cityQuery) {
      delayTimer = setTimeout(() => {
        getCities(({ cityQuery: cityQuery })).then(res => setCityList(res));
        setListRenderKey(Date('now'))

        //save location lan,lat in state
      }, 1000);
    }
    return () => clearTimeout(delayTimer);// Will work after 1000 ms, or 1 s
  }, [cityQuery])



  function handleInput(e) {
    if (e.target.value) setCityQuery(e.target.value);
  }

  function handleFocus(e) {
    e.target.value = "";
  }

     function handleThemeClick(e) {
      let root = document.getElementById("root");
      root.classList.forEach(item => {
        if (item === "light-theme") {
          root.classList.remove(item);
          root.classList.add("dark-theme")
          setTheme('dark-theme');
          document.getElementById("themeImg").classList.remove('light-theme');
          document.getElementById("themeImg").classList.add('dark-theme');
        } else if (item === "dark-theme") {
          root.classList.remove(item);
          root.classList.add("light-theme")
          setTheme('light-theme');
          document.getElementById("themeImg").classList.remove('dark-theme');
          document.getElementById("themeImg").classList.add('light-theme');
        }
      })
  
    } 

  return (
    <header>
      {/*       <HtmlGeo /> */}
      <div className="row">
        <i className="wi wi-day-cloudy"></i>
        <div className="title-container">
          <h1>Weather Forecast</h1>
          <div className="theme-container"><label>theme
            <img id="themeImg" src={
              document.getElementById("root").classList.contains('light-theme') ?
                darkIcon : lightIcon
            }  onClick={handleThemeClick} ></img>
          </label>

          </div>
        </div>
      </div>
      {/* <button onClick={handleThemeClick}>Theme</button> */}


      <div className="row">
        {/*     {forecast?.locati
        on && <><span className="location">{forecast.location.name}, {forecast.location.country}</span>
        <span className="date"></span></>} */}
        {/*         <LocationInfo /> */}
      </div>

      <div className="search-place">
        <input onInput={handleInput} onFocus={handleFocus}
          placeholder='Enter a city name' />
        {cityList && <SearchList key={listRenderKey} cityList={cityList} />}

      </div>

      <CurrentWeather />
    </header>)
}