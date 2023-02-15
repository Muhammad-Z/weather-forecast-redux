import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReverseGeo } from "../api-owm/callAPI";

export default function () {
  const location = useSelector(state => state.location.value)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loadPosition);

      function loadPosition(position) {
        getReverseGeo({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }).then(
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
    }
  }, [])
}