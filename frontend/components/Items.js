import React from 'react';
import styles from '../styles/Home.module.css';

const Items = ({ items, addToCart }) => (
  <div className={styles.section}>
    <h2>Items</h2>
    <div className={styles.grid}>
      {items.map(item => (
        <div key={item.sku} className={styles.card}>
          <img src={item.image} alt={item.title} width={100} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  </div>
);

export default Items;
