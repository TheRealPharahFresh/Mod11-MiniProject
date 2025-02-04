import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import CustomerList from './Components/CustomerList';
import CustomerForm from './Components/CustomerForm';
import HomePage from './Components/HomePage';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import NotFound from './Components/NotFound';
import CustomerDetails from './Components/CustomerDetails';
import ProductDetails from './Components/ProductDetails';
import OrderDetails from './Components/OrderDetails';
import './AppStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceOrderForm from './Components/PlaceOrderForm';
import OrderList from './Components/OrderList';

function App() {
  return (
    <div className='app-container'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-customer' element={<CustomerForm />} />
        <Route path='/edit-customer/:customerId' element={<CustomerForm />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/customers/:customerId' element={<CustomerDetails />} />

        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/edit-product/:id' element={<ProductForm />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:productId' element={<ProductDetails />} /> 
        <Route path='/add-order' element={<PlaceOrderForm />} />
        <Route path='/edit-order/:id' element={<PlaceOrderForm />} />
        <Route path='/orders' element={<OrderList />} />
        <Route path='/orders/:id' element={<OrderDetails />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;


