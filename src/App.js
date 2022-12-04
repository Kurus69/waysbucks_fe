import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './page/cart';
import Detail from './page/detail';
import Home from './page/home';
import Profil from './page/profil';
import { API, setAuthToken } from "./config/api"
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/userContext';
import Products from './page/admin/products';
import Topings from './page/admin/topings';
import AddProduct from './page/admin/addproduct';
import AddTopping from './page/admin/addtoping';
import UpdateProduct from './page/admin/updateproduct';

function App() {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false && !isLoading) {
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/checkauth');
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      // console.log(error);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {
        isLoading ? null :
          state.user.role === "admin" ?
            <Router>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/product' element={<AddProduct />}></Route>
                <Route path='/:product/:id' element={<UpdateProduct />}></Route>
                <Route path='/topings' element={<Topings />}></Route>
                <Route path='/topping' element={<AddTopping />}></Route>
              </Routes>
            </Router>
            :
            <Router>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/profile' element={<Profil />}></Route>
                <Route path='/transaction' element={<Cart />}></Route>
                <Route path='/:detail/:id' element={<Detail />}></Route>
              </Routes>
            </Router>
      }

    </>
  )
}

export default App;
