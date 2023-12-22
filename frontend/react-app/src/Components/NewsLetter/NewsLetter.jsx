import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
    function validateEmail(event) {
        const email = event.target.parentElement.firstElementChild.value;
        const regex = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+).([a-z A-Z]{2,6})$/;

        if (email.trim() == "") {
            alert("Please enter a valid email id");
        } else if (regex.test(email)) {
            alert("Email submitted successfully.");
        } else {
            alert("Wrong email id");
        }
    }
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated </p>
            <div>
                <input type="email" placeholder="me@example.com" required />
                <button onClick={validateEmail}>Subscribe</button>
            </div>
        </div>
    );
};

export default NewsLetter;
