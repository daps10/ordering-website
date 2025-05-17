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
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isChatMode, setIsChatMode] = useState(false);


  // Unified data fetcher: triggers when search or page changes
  useEffect(() => {
    if (isChatMode) {
      fetchChatResults();
    } else {
      fetchItems();
    }
  }, [page, isChatMode, message, search]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint = search.trim()
        ? `http://localhost:5000/api/items/search?query=${search}&page=${page}&limit=1-`
        : `http://localhost:5000/api/items?page=${page}&limit=10`;

      const res = await axios.get(endpoint);
      setItems(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setIsChatMode(false);
    setPage(1); // triggers fetchItems
  };

  const handleChatQuery = async () => {
    if (!message.trim()) return;
    setPage(1);
    setIsChatMode(true); // chat mode enabled
  };

  const fetchChatResults = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/chat?page=${page}&limit=10`, { message });
      setItems(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error('Chat query failed.');
    } finally {
      setLoading(false);
    }
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
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search SKU or Title"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.searchBar}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask a question (e.g. under $50, sku ABC123)"
        />
        <button onClick={handleChatQuery}>Ask</button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <Items items={items} addToCart={addToCart} />
          <Cart cart={cart} removeFromCart={removeFromCart} />
          <div className={styles.pagination}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
