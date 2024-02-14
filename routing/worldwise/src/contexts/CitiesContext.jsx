import { createContext,useState,useEffect, useContext, useReducer } from "react";

const CitiesContext=createContext()
const URL="http://localhost:8000"

const initialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:"",
}

const reducer=(state,action)=>{
  switch(action.type){
    case "loading":
      return {...state,isLoading:true}

    case 'city/loaded':
      return {...state,isLoading:false,currentCity:action.payload}
    case 'cities/loaded':
      return {...state,isLoading:false,cities:action.payload}
    case 'cities/created':
      return {...state,isLoading:false,cities:[...state.cities,action.payload],currentCity:action.payload}

    case "cities/deleted":
      return {...state,isLoading:false,cities:state.cities.filter(city=>city.id!=action.payload),currentCity:{}}

    case "rejected":
      return {...state,isLoading:false,error:action.payload}

    default:
      throw new Error("Unknown action type")

  }
}
const CitiesProvider=({children})=>{
  const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState)

  // const [cities,setCities]=useState([])
  // const [isLoading,setIsLoading]=useState(false)
  // const [currentCity,setCurrentCity]=useState({})
  
  useEffect(()=>{
    async function fetchCities(){
      dispatch({type:'loading'})
      try{
        
        const res=await fetch(`${URL}/cities`);
      const data= await res.json();
      dispatch({type:'cities/loaded',payload:data});}
      catch{
        dispatch({type:"rejected",payload:"There was an error"})
      }
     
    }
    fetchCities()
  },[])

  async function getCities(id){
    if (id==currentCity.id) return
    dispatch({type:'loading'})
    try{
        
        const res=await fetch(`${URL}/cities/${id}`)
        const data=await res.json()
        dispatch({type:'city/loaded',payload:data})

    }
    catch{
      dispatch({type:"rejected",payload:"There was an error"})
    }
  

}

async function createCity(newCity){
  dispatch({type:'loading'})
  try{
    
    const res=await fetch(`${URL}/cities`,{
      method:"POST",
      body:JSON.stringify(newCity),
      headers:{
        "Content-Type":"application/json"
      }
    });
  const data= await res.json();
  dispatch({type:'cities/created',payload:data})
  }
  catch{
    dispatch({type:"rejected",payload:"There was an error"})
  }
 
}

async function deleteCity(id){
  dispatch({type:'loading'})
  try{
    
    await fetch(`${URL}/cities/${id}`,{
      method:"DELETE"
    });
  
  dispatch({type:'cities/deleted',payload:id})
  }
  catch{
    dispatch({type:"rejected",payload:"There was an error"})
  }
  
}

  return <CitiesContext.Provider value={{cities,isLoading,currentCity,getCities,createCity,deleteCity}}>
    {children}
  </CitiesContext.Provider>
}

function useCities(){
    const context=useContext(CitiesContext)
    if (context===undefined)
        throw new Error("CitiesContext was used outside the citiesProvider")
    
    
    return context
}


export {CitiesProvider,useCities}