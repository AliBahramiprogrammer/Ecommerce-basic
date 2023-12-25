import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/LoginSignup.css";


function SignUp() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        isAgree: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { userName, email, password, isAgree } = formData;
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userName,
                email,
                password,
                isAgree,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    window.location.href = "/";
                }
            });
    };

    return (
        <form className="login-signUp" onSubmit={handleSubmit}>
            <div className="login-signUp-container">
                <h1>Sign Up</h1>
                <div className="login-signUp-fields">
                    <input
                        onChange={handleChange}
                        name="userName"
                        value={formData.userName}
                        type="text"
                        placeholder="Your Name"
                        required
                    />
                    <input
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button>Continue</button>
                <p className="login-signUp-login">
                    Already have an account ?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                        <span>Login here</span>
                    </Link>
                </p>
                <div className="login-signUp-agree">
                    <input
                        type="checkbox"
                        name="isAgree"
                        id="isAgree"
                        checked={formData.isAgree}
                        onChange={handleChange}
                    />
                    <label htmlFor="isAgree">
                        By continuing, I agree to the terms of use & privacy
                        policy.
                    </label>
                </div>
            </div>
        </form>
    );
}

export default SignUp;
