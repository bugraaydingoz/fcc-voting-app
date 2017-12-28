import React from "react";
import { Link } from 'react-router-dom'

export const Header = (props) => {
    return (
        <div className="header" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                <Link className="navbar-brand" to="/">Polling App</Link>
                <Link className="btn btn-primary btn-twitter" to="/"><i className="fa fa-twitter"></i> Sign in with Twitter</Link>
            </nav>
        </div >
    );
};