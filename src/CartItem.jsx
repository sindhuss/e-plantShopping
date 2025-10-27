import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
            let total = 0; // 1. Initialize a variable total.

            // 2. Iterate over the cart array using forEach().
            cart.forEach(item => {
                // 3. Extract quantity and cost.
                const { quantity, cost } = item;

                // 4. Convert the cost string to a number and multiply by quantity.
                const numericCost = parseFloat(cost.substring(1));
                const itemTotal = quantity * numericCost;

                // 5. Add the resulting value to total.
                total += itemTotal;
            });

            // 6. Return the final total sum.
            return total;
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    };

    const handleRemove = (item) => {
        dispatch(removeItem());
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const { quantity, cost } = item;

        const numericCost = parseFloat(cost.substring(1));
        const itemTotal = quantity * numericCost;

        return itemTotal;
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


