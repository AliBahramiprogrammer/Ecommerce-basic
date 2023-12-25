import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Error.css";

function Error() {
    return (
        <section className="page_404">
            <div>
                <div class="four_zero_four_bg">
                    <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                    <h3 class="h2">Look like you're lost</h3>

                    <p>the page you are looking for not avaible!</p>
                    <Link className="link_404" to={"/"}>
                        Back to page
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Error;
