import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardsContainer from "./cards/CardsContainer";
import { useEffect } from "react";
import { getfiveDays } from "../api-owm/callAPI";
import HumadityChart from "./charts/HumadityChart";
import RainChart from "./charts/RainChart";
import WindChart from "./charts/WindChart";
import TempChart from "./charts/TempChart";


export default function Main() {
  const dispatch = useDispatch();
  const fiveDays = useSelector((state) => state.fiveDays.value);
  const location = useSelector((state) => state.location.value);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    getfiveDays({ lat: 30, lon: 18 }).then(res =>
      dispatch({ type: 'fiveDays/loadFiveDays', payload: res }))
  }, [location])

  return (
    <main>
      {fiveDays ? <>
        {console.log('oh fiveD is ', fiveDays)}
        <CardsContainer setSelectedDay={setSelectedDay} />
        <TempChart selectedDay={selectedDay} />
        <WindChart selectedDay={selectedDay} />
        <HumadityChart selectedDay={selectedDay} />
        <RainChart selectedDay={selectedDay} />
      </>
        : null}


    </main>
  )

}