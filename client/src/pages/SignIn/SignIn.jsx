import React, { useEffect, useRef, useState } from "react";

import { useAuth } from '../../contexts/AuthContext';

import "./styles.css"

import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const { signIn, currentUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        /*if (currentUser != null && !currentUser?.hasChangedTempPassword) {
            navigate("/signin/changeTempPassword");
            return;
        } else */if (currentUser != null) {
            navigate("/");
        }
    }, [])

    const handleSubmit = () => {
        signIn(emailRef.current.value, passwordRef.current.value).then((error) => {
            switch (error) {
                case null:
                    console.log("aaaaaaaaaaaaa");
                    /*if (currentUser != null && !currentUser?.hasChangedTempPassword) {
                        navigate("/signin/changeTempPassword");
                    }*/
                    break;
                case "auth/invalid-email":
                    setError("invalid email");
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setError("wrong email or password");
                    break;
                case "auth/too-many-requests":
                    setError("Man chill, you made too many requests")
                    break
                default:
                    setError("something went wrong", error)
                    break;
            }
        });
    }

    const setError = (error) => {
        document.querySelector("#errorText").innerText = error;
    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const Hack = () => {
        emailRef.current.value = "svetoslav.b.iliev@elsys-bg.org";
        passwordRef.current.value = "TestPassword1";
        handleSubmit();
    }

    return (
        <div className="signIn">
            <h1 className="title">Sign in</h1>
            <div>
                <p id="errorText"></p>
            </div>
            <input type="text" placeholder="Email" required ref={emailRef} className="emailInput" />
            <div className="passwordHolder">
                <input type={showPassword ? "text" : "password"} placeholder="Password" required ref={passwordRef} className="passwordInput" />
                {/* <span className="imageHolder" onClick={changeShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} className="passwordImage" />
                    </span> */}
            </div>
            <a href="#" className="forgotPassowrd">Forgot Password?</a>
            <button className="signInButton" onClick={handleSubmit}>Sign In</button>
            <p className="orGoogle"><span>OR</span></p>
            <button className="signInButton googleButton" onClick={handleSubmit}>Sign In With Google</button>
            <p className="orGoogle"><span>OR</span></p>
            <button onClick={Hack}>Hack</button>
        </div>
    );
}

export default SignIn;