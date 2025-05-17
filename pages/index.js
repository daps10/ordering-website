import { useEffect, useState } from "react";
import axios from "axios";

const App= () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart]= useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/items')
      .then((res) => setItems(res.data));
  }, []);

  const handleSearch = async() => {
    const res= await axios.post(`http://localhost:5000/api/items/search?query=${search}`);
    setItems(res.data);
  }

  return (
    <div className="p-4">
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU or Title"/>
      <button onClick={handleSearch}>Search</button>
      <h2>Items</h2>
      {
        items.map(item => (
          <div key={item.sku} className="border p-2 m-2">
            <img src={item.image} alt={item.title} width={100}/>
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App;