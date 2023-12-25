import React, { useState } from "react";

const Reset = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email } = formData;
        fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Please check your email.");
            });
    };

    return (
        <form className="login-signUp" onSubmit={handleSubmit}>
            <div className="login-signUp-container">
                <h1>Forgot Password</h1>
                <div className="login-signUp-fields">
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default Reset;
