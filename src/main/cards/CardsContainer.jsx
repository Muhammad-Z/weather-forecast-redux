import { useSelector } from "react-redux";
import DayCard from "./DayCard";

export default function CardsContainer({ setSelectedDay }) {
  const fiveDays = useSelector(state => state.fiveDays.value);
  
  return (<div className="cards-container">
    {Array.isArray(fiveDays) ? fiveDays.map((elem, index) =>
      <DayCard key={elem.date} day={elem.epoch}
        icon={{ d: elem.weather.d.icon, n: elem.weather.n.icon }}
        temp={elem.temp_avg} index={index}
        setSelectedDay={setSelectedDay} />) : null}
  </div>
  )
}