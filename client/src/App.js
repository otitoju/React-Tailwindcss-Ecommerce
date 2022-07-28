import { Routes, Route, Navigate, } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import { Product } from './pages/Product';
import ItemLists from './components/ItemLists';
import LandingPage from './pages/LandingPage';
import SortablePageproduct from './components/SortablePageProduct';
import { Error404Page } from './components/Error404Page';
import CheckoutSuccess from './components/CheckoutSuccess';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/products' element={<SortablePageproduct />}/>
        <Route path='/items' element={<ItemLists />}/>
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}/>
        <Route path='/product/:productId' element={<Product />}/>
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />}/>
        <Route path='/products/:category' element={<Products />}/>
        <Route path='/success' element={<CheckoutSuccess />}/>
        <Route path='*' element={<Error404Page />}/>
      </Routes>
    </div>
  );
}

export default App;
