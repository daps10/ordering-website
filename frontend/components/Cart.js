import React from 'react';
import styles from '../styles/Home.module.css';

const Cart = ({ cart, removeFromCart }) => (
  <div className={styles.section}>
    <h2>Cart</h2>
    <div className={styles.grid}>
      {cart.map(item => (
        <div key={item.sku} className={styles.card}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item.sku)}>Remove</button>
        </div>
      ))}
    </div>
  </div>
);

export default Cart;
