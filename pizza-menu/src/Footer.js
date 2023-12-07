import React from "react";
import './index.css'



const Footer=()=>{
    let hours=new Date().getHours()
    const openHour=9
    const closeHour=22
    const isOpen =hours>=openHour && hours<=closeHour

    return <footer className="footer">{isOpen && <div className="order"><p>We're currently open until {closeHour}:00 you can order or order online.</p>
    <button className="btn">Order Now!</button></div>
} </footer>
}
export default Footer;