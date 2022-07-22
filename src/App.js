import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import { Product } from './pages/Product';
import ItemLists from './components/ItemLists';
import LandingPage from './pages/LandingPage';
import SortablePageproduct from './components/SortablePageProduct';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/products' element={<SortablePageproduct />}/>
        <Route path='/items' element={<ItemLists />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/products/:category' element={<Products />}/>
      </Routes>
    </div>
  );
}

export default App;
