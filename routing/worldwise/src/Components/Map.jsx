import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css'
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button'
import {useUrlPosition} from '../hooks/useUrlPosition';
const Map=()=>{
    // const navigate=useNavigate()
    const {cities} =useCities()
    const {isLoading:isLoadingPosition,position:geoLocationPosition,getPosition} = useGeolocation()
    const [mapPosition,setMapPosition]=useState([40,0])
    
    const [maplat,maplng]=useUrlPosition()

    useEffect(function(){
        if (maplat && maplng) setMapPosition([maplat,maplng])
    },[maplat,maplng])

    useEffect(function(){
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])
    },[geoLocationPosition])
    return (
        <div className={styles.mapContainer} >
        
        {!geoLocationPosition && <Button type='position' onClick={getPosition} >
            {isLoadingPosition?"Loading...":"Use your position"}
        </Button>}
             <MapContainer center={mapPosition} zoom={5} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map(city=>(<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>))}
    <ChangeCenter position={mapPosition}/>
    <DetectClick />
  </MapContainer>
        </div>
    )
}

const ChangeCenter=({position})=>{
    const map=useMap()
    map.setView(position)
    return null;
}
const DetectClick=()=>{
    const navigate=useNavigate()
    useMapEvents({click:e=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)})
}

export default Map;
