import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/UserInfo.css";

function UserDetail() {
    const [state, setState] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setState(data.data);
                if (data.data === "token expired.") {
                    console.log(1)
                    alert("Token expired login again,please");
                    window.localStorage.clear()
                    window.location.href= "./signup"
                }
            });
    }, []);

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "/signup";
    };
    return (
        <div className="user-info">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="checkmark-group"
                viewBox="0 0 128 128"
            >
                <title>Successful Login</title>
                <circle id="circle" cx="64" cy="64" r="59.4" />
                <path id="checkmark" d="M24.75 62l27.5 27.5 51-51" />
            </svg>
            <div className="user-info-container">
                Name: <h1>{state.userName}</h1>
                Email <h1>{state.email}</h1>
                <br />
                <a onClick={logOut}>Log Out</a>
            </div>
        </div>
    );
}

export default UserDetail;
