import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login"
import CityList from "./Components/CityList";
//import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import City from './Components/City';
import Form from "./Components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
function App() {
  
  
  
  return (
    <AuthProvider>
  <CitiesProvider>
  
  <BrowserRouter>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Navigate replace to='cities' />}/>
        {/* <Route index element={<CityList />} /> */}
        <Route path="cities" element={<CityList />} />
        <Route path="countries" element={<CountryList />} />
        <Route path="form" element={<Form />} />
        <Route path="cities/:id" element={<City />}/>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
  
  </CitiesProvider>
  </AuthProvider>)
}

export default App;