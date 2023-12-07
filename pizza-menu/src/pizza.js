import React  from "react";


const Pizza=({name,ingredients,photoName,price,soldout})=>{

    return <div className={`pizza ${soldout ? "sold-out":""}`}>
    
        <img src={photoName} alt="pizza spinaci" />
        <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldout?"Sold Out":price}</span>
    </div>
    </div>
}
export default Pizza;