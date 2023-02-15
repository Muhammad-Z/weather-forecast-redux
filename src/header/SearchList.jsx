import CityEntry from "./CityEntry";
import { useDispatch } from 'react-redux';


export default function SearchList({ cityList }) {
  const dispatch = useDispatch();

  function handleCityClick(e) {
  
    dispatch({
      type: 'location/loadLocation', payload: {
        name: e.target.dataset.name,
        country: e.target.dataset.country, 
        lat: e.target.dataset.lat,
        lon: e.target.dataset.lon, 
      }
    })
    document.getElementById('cityList').style.display = "none";
  }

  return (<>
    <div className="relative">
      <ul id="cityList" className="search-container" onClick={handleCityClick} > {/* map something to get the list */}
        {cityList.map((city, index) => (<CityEntry key={city.loc + index} /* name={city.name}
          country={city.country.name} */
          loc={city.loc}
          name={city.name} country={city.country.name} />))}
      </ul>
    </div>
  </>
  )
}