import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/search/search.js"
import Categories from './pages/categories/categories.js';
import ViewUserAnimeList from './pages/viewUserAnimeList/viewUserAnimeList';


// This App uses the Kitsu API
// https://kitsu.docs.apiary.io/
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/animeklb" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path='/view-user-anime-list' element={<ViewUserAnimeList />} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
