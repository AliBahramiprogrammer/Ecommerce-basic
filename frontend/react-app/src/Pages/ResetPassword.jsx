import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        passwordConfirm:""
    })
    const navigate = useNavigate()
    const {id} = useParams()

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match")
        } else {
            fetch(`http://localhost:5000/reset_password/${id}`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                password: formData.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "Success") {
                    navigate("/login")
                }
                alert(data.status);
            }).catch(err => console.log(err))
        }
    }


    return (
        <form className="login-signUp" onSubmit={handleSubmit}>
            <div className="login-signUp-container">
                <h1>Reset Password</h1>
                <div className="login-signUp-fields">
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        onChange={handleChange}
                        value={formData.passwordConfirm}
                        name="passwordConfirm"
                        type="password"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ResetPassword;
