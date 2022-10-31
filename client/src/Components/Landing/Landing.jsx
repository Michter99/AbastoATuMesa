import React from "react";
import "./Landing.css"

const Landing = () => {
    return (
        <div>
            <div id="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <img src={require("../Assets/intro.svg").default} className="img-fluid" alt="..." />
                        </div>
                        <div className="right col-lg-7 col-sm-12">
                            <p>HASTA TU MESA</p>
                            <h1>Los alimentos más frescos</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;