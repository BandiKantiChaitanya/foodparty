import React, { useContext, useState } from 'react'
import '../App.css'
import { IoSearchSharp } from "react-icons/io5";
import { dishes } from '../data/mockDishes';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import {  useDishContext } from '../context/dishContext';
import DishModal from './DishModal';
import { DiStackoverflow } from "react-icons/di";

function Home() {
  // console.log('Om Namah Shivaya')
  const [search,setSearch]=useState('')
  const [active,setActive]=useState(null)
  const buttons = ['Starter', 'Main Course', 'Dessert', 'Sides'];
  const cat=[...new Set(dishes.map((d)=>d.mealType))]

  const [showVeg, setShowVeg] = useState(false);
const [showNonVeg, setShowNonVeg] = useState(false);
  
 let filterDish = dishes.filter((d) => {
  // const isSearching = search.trim().length > 0;
  const matchesSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = !active || d.mealType === active;

  
  const typeFilterEnabled = showVeg || showNonVeg;
  const matchesType = !typeFilterEnabled || 
    (d.type === 'veg' && showVeg) || 
    (d.type === 'non-veg' && showNonVeg);

  return  matchesSearch && matchesCategory && matchesType;
});


  const { counts, handleIncrement, handleDecrement, totalCount } = useDishContext();
  

  const [showModal, setShowModal] = useState(false);
const [selectedDish, setSelectedDish] = useState(null);

const openModal = (dish) => {
  setSelectedDish(dish);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  setSelectedDish(null);
};

  const filteredTotalCount = filterDish.reduce((sum, dish) => {
  return sum + (counts[dish.id] || 0);
}, 0);

const navigate=useNavigate()

  return (
    <div>
      <div className='search' >
        <input type="text" name='search' value={search} onChange={(e)=>{setSearch(e.target.value)}}  placeholder='Search Dish for you party...' />
        {/* <p></p> */}
        <IoSearchSharp  className='search-icon' />
      </div>
      <div className='filterBtn' >
        {buttons.map((label)=>(
          <button key={label} className={active===label?'active':''} onClick={()=>setActive(active === label ? null : label)} >{label}</button>
        ))}
      </div>
      <div className='title d-flex flex-row justify-content-between'>
        <h3>{active} Selected ({filteredTotalCount})</h3>
        <div className="toggle-switches">
        <label className="switch-label">
          <input
            type="checkbox"
            checked={showVeg}
            onChange={() => setShowVeg(!showVeg)}
          />
          <div className={`icon-toggle veg ${showVeg ? 'checked' : ''}`}>
            <GoDotFill />
          </div>
        </label>

        <label className="switch-label">
          <input
            type="checkbox"
            checked={showNonVeg}
            onChange={() => setShowNonVeg(!showNonVeg)}
          />
          <div className={`icon-toggle non-veg ${showNonVeg ? 'checked' : ''}`}>
            <GoDotFill />
          </div>
        </label>
      </div>
      </div>



      {
        filterDish.length === 0 ? (
    <div className="text-center my-5">
      <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="No food" style={{ width: "100px", opacity: 0.5 }} />
      <h5 className="mt-3 text-muted">🍽️ Oops! No delicious dishes match your taste right now.</h5>
    </div>
        ):(
        filterDish?.map((dish,i)=>(
          <div className="card mb-4" key={i} onClick={() => openModal(dish)} style={{cursor:'pointer'}}>
            <div className="card-body d-flex justify-content-between">
              <div className='main-content' >
                <div className="dish-header d-flex align-items-center gap-2">
                  <h5 className="mb-0">{dish.name}</h5>
                  <GoDotFill className={`icon ${dish.type === 'veg' ? 'veg-dot' : 'text-danger border-danger'}`} />
                </div>
                <h6 className='mt-2' >&#8377; {dish.price}</h6>
                <p className='mt-4 description' > {dish.description.length > 120 ? `${dish.description.slice(0, 120)}...`: dish.description}
                {dish.description.length>120  &&(
                    <button className="btn btn-link p-0" style={{textDecoration:'none',color:'black',fontWeight:'500',marginTop:'-5px'}} onClick={(e) => {  e.stopPropagation(); openModal(dish); }}>Read more</button>
                )}
                </p>

                <button className='btn' onClick={()=>navigate(`/ingredients/${dish.id}`)} style={{color:"#FC8019",fontWeight:'bolder'}} ><DiStackoverflow className='me-1' style={{marginTop:'-5px'}} />Ingredients</button>
              </div>
              <div className='image'>
                  <img src={dish.image} alt={dish.name}  />
                  <div className='overlay-buttons d-flex align-items-center justify-content-center' onClick={() => openModal(dish)}  >
                    
                    <button onClick={(e) => {handleDecrement(dish.id); e.stopPropagation()}}>-</button>
                    <span>{counts[dish.id] || 0}</span>
                    <button onClick={(e) => {handleIncrement(dish.id); e.stopPropagation();}}>+</button>
                  </div>
              </div>
            </div>
          </div>
        ))
    )
      }
        {totalCount > 0 && (
    <div className="bottom-bar-container shadow">
        <div className="bar-content  d-flex flex-column justify-content-between align-items-center  ">
        <span className="dish-info fs-5">Total Dish Selected <strong>{totalCount}</strong> </span>
        <button className="btn btn-dark w-75" >Continue</button>
        </div>
    </div>
    )}
      
      <DishModal show={showModal} dish={selectedDish} onClose={closeModal} />
    </div>
  )
}
export default Home