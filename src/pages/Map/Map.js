import React from "react";
import styled from 'styled-components';
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin: 50px 100px;
  margin-bottom:150px;
`
const GoogleMap = styled.div`
  display:flex;
  gap: 50px;
  width:100%;
  margin-top: 60px;
`
const MapDiscribtion = styled.p`
  display:flex;
  flex-wrap:wrap;
  font-size: 18px;
  line-height:35px;
  width: 550px;
  margin-left:auto;
`
const SearchGroup = styled.div`
  display:flex;
  flex-direction:column;
  gap:30px;
`
const SearchButton = styled.button`
  width:500px;
  height:80px;
  font-size:18px;
  background-color:black;
  color:white;
  &:hover{
    background-color:#8D633D;
  }
`
const MapLabel = styled.div`
  font-size:20px;
`
const MapTitle = styled.div`
  font-size:30px;
  font-weight:700;
  padding-bottom:20px;
  border-bottom: 1px solid black;
`
const Img = styled.img`
  width:100%;
  margin-top:10px;
`
let cachedScripts = [];
function useScript(src) {
  // Keeping track of script loaded and error state

  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,

          error: false
        });
      } else {
        cachedScripts.push(src);
        // Create script
        let script = document.createElement("script");
        script.src = src;
        script.async = true;
        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();
          setState({
            loaded: true,
            error: true
          });
        };
        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);
        // Add script to document body
        document.body.appendChild(script);
        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener("load", onScriptLoad);
          script.removeEventListener("error", onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );
  return [state.loaded, state.error];
}

function Map() {
  const [loaded, error] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdnhrbnlDhmJnSMqpJkzSJb2YbZZWTI6I&&libraries=places&callback=initMap"
  );
  const [map, setDataMap] = useState();
  const [from, setFrom] = useState('');

  useEffect(() => {
    if (loaded) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: { lat: 25.033964, lng: 121.564468 },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      });
      setDataMap(map);
    }
  }, [loaded]);

  if(!loaded){
    return
  }
  //create a DirectionsService object to use the route method and get a result for our request
  const directionsService = new window.google.maps.DirectionsService();

  //create a DirectionsRenderer object which we will use to display the route
  const directionsDisplay = new window.google.maps.DirectionsRenderer();

  //bind the DirectionsRenderer to the map
  directionsDisplay.setMap(map);

  function calcRoute() {
    //create request
    const request = {
      origin: from,
      destination: 'AppWorks School',
      travelMode: window.google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
      unitSystem: window.google.maps.UnitSystem.METRIC,
    };

    directionsService.route(request, function (result, status) {
      console.log(status);
      if (status == window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        console.log(result);
      } else {
        //delete route from map
        directionsDisplay.setDirections({ routes: [] });
        //center map in London
        map.setCenter({ lat: 25.033964, lng: 121.564468 });
        //show error message
      }
    });
  }

  return (
    <Wrapper>
      <SearchGroup>
        <MapTitle>來店逛逛</MapTitle>
        <MapLabel>請輸入您的位置,我們會幫您計算到店的最短路徑</MapLabel>
        <input type="text" id="from" placeholder="你在哪裏?" className="form-control" onChange={(e)=>setFrom(e.target.value)}/>
        <SearchButton onClick={() => calcRoute()}>點 我 去 試 穿</SearchButton>
      </SearchGroup>
      <GoogleMap>
        <div id="map" style={{ height: "550px", width:'1280px',border: `20px solid #BDB0A4` }} />
        <MapDiscribtion>除了優秀的設計，我們還提供一流的客戶服務和試穿體驗。
          我們的專業店員將為您提供全面的服務，幫助您選擇最適合您的衣服，並確保您的試穿體驗愉快而舒適。
          在STYLiSH店裡試穿，您將感受到真正的服裝品質和穿著體驗。
          <Img alt='fashion-store' src='https://img.freepik.com/premium-photo/women-s-fashion-store-shopping-center_1112-9608.jpg?w=1480'/>
        </MapDiscribtion>
      </GoogleMap>
    </Wrapper>
  );
}
export default Map;