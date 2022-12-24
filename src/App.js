import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/search/search.js"
import Categories from './pages/categories/categories.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />}/>
      <Route path="/categories" element={<Categories />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
