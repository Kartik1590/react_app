// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner"
import Message from './Message'
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client"
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate=useNavigate();
  const {createCity,isLoading}=useCities();
  const [maplat,maplng]=useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding,setIsLoadingGeocoding]=useState(false)
  const [emoji,setEmoji]=useState("")
  const [error,setError]=useState("")

  const navigates=useNavigate()
  async function handleSubmit(e){
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{'lat':maplat,'lng':maplng}
    };
    await createCity(newCity)
    navigates("/app/cities")
    
  }
  useEffect(function(){
    if(!maplat && !maplng) return 
    async function fetchCityData(){
      
      try{
        setIsLoadingGeocoding(true)
        const res=await fetch(`${BASE_URL}?latitude=${maplat}&longitude=${maplng}`)
        const data =await res.json()
        if (!data.countryCode) throw new Error("No Country where you clicked, click somewhere else")
        setError('')
        setCityName(data.city || data.locality)
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }
      catch (err){
        setError(err.message)
      }
      finally{
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  },[maplat,maplng])

  if(isLoadingGeocoding) return <Spinner />
  if (error) return <Message message={error}/>
  if (!maplat && !maplng) return <>
    <Message message={"Click somewhere on the map to continue"} />
    <Button type="back" onClick={()=>navigate('..',{relative:'cities'})}>&larr; Back</Button>
  </>

  return (
    <form className={`${styles.form} ${isLoading?styles.loading:''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} id="date"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button type='back' onClick={(e)=>{e.preventDefault(); navigate(-1)}}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
