import React, { useState } from 'react';
import "./../style/login.css";

const Login = (props: any) => {

    return (
        <div className="container">
            <div className="login-form" >
                <h2>Login Page</h2>
                {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={props.props.mainState.userEmail}
                        onChange={(e) => props.props.setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={props.props.mainState.userPassword}
                        onChange={(e) => props.props.setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="login-button" onClick={props.props.onLoginSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
