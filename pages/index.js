import { useEffect, useState } from "react";
import axios from "axios";

const App= () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart]= useState([]);

  return (
    <div className="p-4">
      <h2>Items</h2>
    </div>
  )
}

export default App;