import React, { useState } from "react";
import { Link } from "react-router-dom";



function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formData;
        fetch("http://localhost:5000/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
              if (data.status == "ok") {
                  alert("login successful");
                  window.localStorage.setItem("token", data.data);
                  window.location.href = "/user-detail";
            }
        })
    }

    return (
        <form className="login-signUp" onSubmit={handleSubmit}>
            <div className="login-signUp-container">
                <h1>Login</h1>
                <div className="login-signUp-fields">
                    <input  onChange={handleChange} value={formData.email} name="email" type="email" placeholder="Email Address" required />
                    <input  onChange={handleChange} value={formData.password} name="password" type="password" placeholder="Password" required />
                </div>
                <button type="submit">Continue</button>
                <p className="login-signUp-login">
                    Already Registered ?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/signup"}>
                        <span>Sign Up</span>
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Login;
