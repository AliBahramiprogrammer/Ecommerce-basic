import React from "react";
import { Link } from "react-router-dom";

function Error() {
    return (
        <section className="section">
            <h2>404</h2>
            <h2>Page not found</h2>
            <Link to={"/shop"}>Back to page</Link>
        </section>
    );
}

export default Error;
