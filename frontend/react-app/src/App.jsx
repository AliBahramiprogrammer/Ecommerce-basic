import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import ShopCategory from "./Pages/ShopCategory";
import Shop from "./Pages/Shop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product"
import Error from "./Pages/Error";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignUp";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/assets/banner_mens.png";
import women_banner from "./Components/assets/banner_women.png";
import kid_banner from "./Components/assets/banner_kids.png";
import Login from "./Pages/Login"
import UserDetail from "./Pages/UserDetail";
import Reset from "./Pages/reset";
import ResetPassword from "./Pages/ResetPassword";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/men" element={<ShopCategory banner={men_banner} category="men"/>}/>
                    <Route path="/women" element={<ShopCategory banner={women_banner} category="women"/>}/>
                    <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
                    <Route path="/product" element={<Product />}>
                        <Route path=':productId' element={<Product/>}/>
                    </Route>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/> 
                    <Route path="/user-detail" element={<UserDetail/>} /> 
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/reset_password/:id" element={<ResetPassword />}></Route>
                <Route path="*" element={<Error/>}></Route>
                </Routes>
                <Footer/>                
            </BrowserRouter>
        </>
    );
}

export default App;
