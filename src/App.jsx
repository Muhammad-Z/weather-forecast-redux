import Header from './header/Header';
import Main from './main/Main';
import './styles/style.css';
import './weather-icons.min.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function App() {
  const location = useSelector((state) => state.location.value);


  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light-theme');

  useEffect(() => {
    if (location) setIsLoading(false);
  }, [location])

  return (<>
    <Header setTheme={setTheme} />
    {isLoading ? <div className="loading-container"><LoadingSpinner /></div>
      : <Main />}
  </>
  )
}

