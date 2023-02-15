//controller
import api from './api';
import { serializeCities, serializeCurrentWeather, serializefiveDays } from './serializer';

export function getCities(options) {
  return (api.get(`/geo/1.0/direct?q=${options.cityQuery}&limit=5`).then(res => serializeCities(res))
  )
}

export function getCurrentWeather(options) {
  return (api.get(`/data/2.5/weather?lat=${options.lat}&lon=${options.lon}&units=metric`).then(res => serializeCurrentWeather(res.data))
  )
}

export function getfiveDays(options) {
  return (api.get(`/data/2.5/forecast?lat=${options.lat}&lon=${options.lon}&units=metric`)
    .then(res => serializefiveDays(res)))
}

export function getReverseGeo(options) {
  return (api.get(`/geo/1.0/reverse?lat=${options.lat}&lon=${options.lon}&limit=1`))
}