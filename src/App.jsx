import Header from './header/Header';
import Main from './main/Main';
import './styles/style.css';
import './weather-icons.min.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function App() {
  /*   const ThemeContext = createContext(null); */
  const location = useSelector((state) => state.location.value);


  /*  const forecast = useForecast(); */
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light-theme');

  /*   const forecastCtx = useMemo(()=> forecast.location, [forecast.location]) 
   */
  useEffect(() => {
    if (location) setIsLoading(false);

    return () => console.log('unmounting app')
  }, [location])

  //{/*  */}
  return (<>
    {/*  <CurrentWeather /> */}
    {/*  <ThemeContext.Provider value={theme}> */}

    <Header  setTheme={setTheme} />
    {isLoading ? <div className="loading-container"><LoadingSpinner /></div>
      : <Main />}
    {/* </ThemeContext.Provider> */}
  </>
  )
}

