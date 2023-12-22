import React, { useContext, useState } from "react";
import "./Navbar.css";

import Logo from "../assets/logo.png";
import Cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
    const { getTotalCartItems } = useContext(ShopContext);
    const [menu, setMenu] = useState("shop");

    return (
        <div className="navbar">
            <Link to={"/"} className="nav-logo-link">
                <div className="nav-logo">
                    <img src={Logo} alt="logo" />
                    <p>SHOPPER</p>
                </div>
            </Link>
            <ul className="nav-menu">
                <li
                    onClick={() => {
                        setMenu("shop");
                    }}
                >
                    <Link style={{ textDecoration: "none" }} to="/shop">
                        Shop
                    </Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li
                    onClick={() => {
                        setMenu("men");
                    }}
                >
                    <Link style={{ textDecoration: "none" }} to="/men">
                        Men
                    </Link>
                    {menu === "men" ? <hr /> : null}
                </li>
                <li
                    onClick={() => {
                        setMenu("women");
                    }}
                >
                    <Link style={{ textDecoration: "none" }} to="/women">
                        Women
                    </Link>
                    {menu === "women" ? <hr /> : null}
                </li>
                <li
                    onClick={() => {
                        setMenu("kids");
                    }}
                >
                    <Link style={{ textDecoration: "none" }} to="/kids">
                        Kids
                    </Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/signup">
                    <button>Login</button>
                </Link>
                <Link to="cart">
                    <img src={Cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
