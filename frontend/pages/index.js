import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Items from '../components/Items';
import Cart from '../components/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
      } catch (err) {
        toast.error('Failed to fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async () => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
      } catch (err) {
        toast.error('Failed to fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    toast.success(`${item.title} added to cart`);
  };

  const removeFromCart = (sku) => {
    const removed = cart.find(item => item.sku === sku);
    setCart(cart.filter(item => item.sku !== sku));
    if (removed) toast.info(`${removed.title} removed from cart`);
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className={styles.searchBar}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU or Title" />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <Items items={items} addToCart={addToCart} />
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </>
      )}
    </div>
  );
}
