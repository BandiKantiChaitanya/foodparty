import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dishes } from '../data/mockDishes';
import { IoIosArrowBack } from "react-icons/io";

function Ingredients() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dish = dishes.find((d) => d.id === parseInt(id));

  if (!dish) return <p>Dish not found</p>;

  return (
    <div className="ingredients-page">
      <button onClick={() => navigate(-1)} className='btn fs-2'><IoIosArrowBack /></button>
      <hr />
      <div className='d-flex justify-content-between'>
        <h2>{dish.name}</h2>
        <img src="https://admin.sriboga.com/storage/news/1685519127-chef-preparing-food-ingredients-2021-09-24-03-57-22-utc%20(1).webp" style={{width:"auto",height:'300px',borderRadius:"14px"}} alt="image" />
      </div>
      <h4>Ingredients</h4>
      <p>For 2 people</p>
      <hr />
      <ul className="ingredient-list">
      {dish.ingredients.map((ing, i) => (
        <li key={i} className="ingredient-item">
          <span className="ingredient-name">{ing.name}</span>
          <span className="ingredient-quantity">{ing.quantity}</span>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default Ingredients;
