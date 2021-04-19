import React from 'react';
import {NavLink} from "react-router-dom";
import "./Unauthorized.css"

const Unauthorized = () => {
    return (
        <div className='container'>
            <div className="gandalf">
                <div className="fireball"/>
                <div className="skirt"/>
                <div className="sleeves"/>
                <div className="shoulders">
                    <div className="hand left"/>
                    <div className="hand right"/>
                </div>
                <div className="head">
                    <div className="hair"/>
                    <div className="beard"/>
                </div>
            </div>
            <div className="message">
                <h1>403 - You Shall Not Pass</h1>
                <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
            </div>
            <p><NavLink to='/login'>Back to Home</NavLink></p>
        </div>
    )
}

export default Unauthorized;