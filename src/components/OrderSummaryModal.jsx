import React from 'react';

function OrderSummaryModal({ show, onClose, onConfirm, selectedDishes, deliveryCharge = 50 }) {
  if (!show) return null;

  const totalPrice = selectedDishes.reduce((sum, item) => {
    return sum + (item.price * item.count);
  }, 0);

  const grandTotal = totalPrice + deliveryCharge;

  return (
    <div className="custom-backdrop">
      <div className="custom-bottom-modal animate-up">
        <h5>Order Summary</h5>
        <ul className="list-group my-3">
          {selectedDishes.map(dish => (
            <li key={dish.id} className="list-group-item d-flex justify-content-between">
              <span>{dish.name} x {dish.count}</span>
              <span>₹{dish.price * dish.count}</span>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between">
          <strong>Delivery Charge</strong>
          <span>₹{deliveryCharge}</span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <strong>Total</strong>
          <span>₹{grandTotal}</span>
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-secondary w-45" onClick={onClose}>Cancel</button>
          <button className="btn btn-success w-45" onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryModal;
