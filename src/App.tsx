import React from 'react';
import AppHeader from "./components/app-header/app-header";
import './App.css'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import data from './utils/data.json';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import spicyX from "./images/spicy-x.png";
import protostomiaMeat from "./images/protostomia-meat.png";
import foullenianTree from "./images/foullenian-tree.png";
import mineralRings from "./images/mineral-rings.png";

function App() {

  const fakeData = [
        {
            text: 'Соус Spicy-X',
            price: 30,
            thumbnail: spicyX,
            id: 0
        },
        {
            text: 'Мясо бессмертных моллюсков Protostomia',
            price: 300,
            thumbnail: protostomiaMeat,
            id: 1
        },
        {
            text: 'Плоды Фалленианского дерева',
            price: 80,
            thumbnail: foullenianTree,
            id: 2
        },
        {
            text: 'Хрустящие минеральные кольца',
            price: 80,
            thumbnail: mineralRings,
            id: 3
        },
        {
            text: 'Хрустящие минеральные кольца',
            price: 80,
            thumbnail: mineralRings,
            id: 4
        },
    ]

  return (
    <div className='app'>
      <AppHeader />
      <main className='burgerContainer'>
          <BurgerIngredients data={data} />
          <BurgerConstructor fakeData={fakeData} />
      </main>
    </div>
  );
}

export default App;
