import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import fiveDaysReducer from './fiveDaysSlice'
import currentWeatherReducer from './currentWeatherSlice'
import locationReducer from './locationSlice'

/* import selectedDayReducer from './selectedDaySlice'
import currentWeatherReducer from './currentWeatherSlice' */


const reducer = combineReducers({
  fiveDays: fiveDaysReducer,
  location: locationReducer,
  currentWeather: currentWeatherReducer,
})

export const store = configureStore({
  reducer/* : {
    fiveDays: fiveDaysReducer,
    currentWeather: currentWeatherReducer,
    location : locationReducer,
  } */,
})