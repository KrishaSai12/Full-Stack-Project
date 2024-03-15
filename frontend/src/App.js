import './App.css';
import Home from './components/Home ';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/ProductDetail';
import ProductSearch from './components/ProductSearch';

import LoginUser from './components/user/LoginUser';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrder from './components/order/UserOrder';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';


function App() {
  useEffect(()=> {
    store.dispatch(loadUser)

  })
  return (
    <Router>
      <div className="App">
        <HelmetProvider >
          <Header />
          {/* it will give some space between the elements */}
          <div className="container container-fluid">
            {/* it is like a div to show the error */}
            <ToastContainer theme='dark' />
            <Routes>
              {/* route is used to route the file which has 2 arguments path will define url and element will define which component should route */}
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/login' element={<LoginUser />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
              <Route path='/myprofile/update' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
              <Route path='/myprofile/update/password' element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shipping' element={<ProtectedRoute> <Shipping /> </ProtectedRoute>} />
              <Route path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />
              <Route path='/order/success' element={<ProtectedRoute> <OrderSuccess /> </ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute> <UserOrder /> </ProtectedRoute>} />
              <Route path='/order/:id' element={<ProtectedRoute> <OrderDetail /> </ProtectedRoute>} />

            </Routes>

          </div>
          {/* Admin Routes */}

          <Routes>
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}> <ProductList /> </ProtectedRoute>} />
          <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}> <NewProduct /> </ProtectedRoute>} />
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}> <UpdateProduct /> </ProtectedRoute>} />
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}> <OrderList /> </ProtectedRoute>} />
          <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}> <UpdateOrder /> </ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}> <UserList /> </ProtectedRoute>} />
          <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}> <UpdateUser /> </ProtectedRoute>} />
          <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}> <ReviewList /> </ProtectedRoute>} />
          </Routes>


          <Footer />

        </HelmetProvider>


      </div>

    </Router>

  );
}

export default App;
