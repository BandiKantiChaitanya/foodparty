import React, { useEffect } from 'react';
import '../App.css'; 
import { GoDotFill } from 'react-icons/go';
import { useDishContext } from '../context/dishContext';
import { useNavigate } from 'react-router-dom';
import { DiStackoverflow } from 'react-icons/di';

const DishModal = ({ dish, show, onClose }) => {
  // Prevent body scrolling when modal is open
  const { counts, setCounts, handleIncrement, handleDecrement, totalCount } = useDishContext();
  const navigate=useNavigate()
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => (document.body.style.overflow = 'auto');
  }, [show]);

  if (!show) return null;


  return (
    <>
      {/* BACKDROP */}
      <div className="custom-backdrop" onClick={onClose}></div>

      {/* MODAL */}
      <div className="custom-bottom-modal animate-up">
        <div className="modal-header">
          {/* <h5 className="modal-title">{dish?.name}</h5> */}
          <img src={dish.image} alt={dish.name}   className="modal-dish-image mt-4 mb-4" />
          <button type="button" className="btn-close position-absolute top-0 end-0 m-2" onClick={onClose}></button>
        </div>
        <div className="modal-body ">
          <div className="dish-header d-flex justify-content-between align-items-center mb-4 ">
                <div className='d-flex  align-items-center gap-2 '>
                 <h5 className="">{dish.name}</h5>
                <GoDotFill className={`icon ${dish.type === 'veg' ? 'veg-dot' : 'text-danger border-danger'}`} />
                </div>
                <div className='buttons d-flex align-items-center gap-2'>
                    <button onClick={() => handleDecrement(dish.id)}>-</button>
                    <span>{counts[dish.id] || 0}</span>
                    <button onClick={() => handleIncrement(dish.id)}>+</button>
                  </div>
          </div>
        
        <p style={{lineHeight:'1.75'}}><strong>{dish?.mealType}</strong> {dish?.description}</p>
        <button className='btn' onClick={()=>navigate(`/ingredients/${dish.id}`)} style={{color:"#FC8019",fontWeight:'bolder'}} ><DiStackoverflow className='me-1' style={{marginTop:'-5px'}} />Ingredients</button>
        </div>
      </div>
    </>
  );
};

export default DishModal;
