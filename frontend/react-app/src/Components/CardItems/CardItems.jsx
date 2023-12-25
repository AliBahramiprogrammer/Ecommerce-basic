import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CardItems.css";
import remove_icon from "../assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CardItems = () => {
    const { all_product, getTotalCartAmount, cartItems, removeFromCart } =
        useContext(ShopContext);
    return (
        <div className="card-items">
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div>
                            <div className="cart-item-format cart-items-format-main">
                                <img
                                    src={e.image}
                                    alt=""
                                    className="cart-product-icon"
                                />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className="cart-items-quantity">
                                    {cartItems[e.id]}
                                </button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img
                                    className="cart-items-remove-icon"
                                    src={remove_icon}
                                    onClick={() => {
                                        removeFromCart(e.id);
                                    }}
                                    alt=""
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cart-items-down">
                <div className="card-items-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cart-items-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <h3>Total</h3>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        
                        <button><Link className="button" to={"/login"}>PROCEED TO CHECKOUT</Link></button>
                    </div>
                </div>
                <div className="cart-items-promo-code">
                    <p>If you have a promo code, Enter it here.</p>
                    <div className="cart-items-promo-box">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItems;
