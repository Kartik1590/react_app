import React from "react";
import Pizza from './pizza'
import './index.css'


const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];

const Menu =()=>{
    const pizzaLen=pizzaData.length
    return (<main className="menu">
        <h2>Our Menu</h2>
        {pizzaLen>0?
        <>
        <p>Italin cusine only made for you.</p>
        <ul className="pizzas">
        {pizzaData.map(pizza=><Pizza name={pizza.name} 
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
            soldout={pizza.soldOut}
        />
        )}
        </ul></>:false}
        
        
        
    
    </main>)
}
export default Menu