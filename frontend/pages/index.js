import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Items from '../components/Items';
import Cart from '../components/Cart';

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async () => {
     try {
      const res = await axios.post(`http://localhost:5000/api/items/search?query=${search}`);
      setItems(res.data);
      setError('');
    } catch (err) {
      setError('Search failed. Please check your input or try again later.');
    }
  };

  const handleChatQuery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chat', {
        params: { message }
      });
      setItems(res.data);
      setError('');
    } catch (err) {
      setError('Chat query failed. Please try again later.');
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (sku) => {
    setCart(cart.filter(item => item.sku !== sku));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU or Title" />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.searchBar}>
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask a question (e.g. under $50, sku ABC123)" />
        <button onClick={handleChatQuery}>Ask</button>
      </div>

    {error && <div className={styles.error}>{error}</div>}
      <Items items={items} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}
