import { useSelector } from "react-redux";

export default function LocationInfo() {

  const location = useSelector(state => state.location.value);

  return (<>
    {location ?
      <>
        <span className="location">{location.name},
          {location.country}</span>

        <span className="date"></span>
      </>
      : null}
  </>)
}