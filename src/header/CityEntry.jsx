import React from 'react';

export default function CityEntry({ name, country, loc }) {

  return (
    <li data-lat={loc.lat} data-lon={loc.lon}
      data-name={name} data-country={country}> {name}, {country}</li>
  )
}