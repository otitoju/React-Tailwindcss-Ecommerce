import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import { Product } from './pages/Product';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>
    </div>
  );
}

export default App;
