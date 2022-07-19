import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ChangeTempPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { changeTempPassword, currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null && currentUser?.hasChangedTempPassword) {
      navigate("/");
      return;
    } else if (currentUser == null) {
      navigate("/signin");
    }
  }, [])


  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const changeShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const Submit = () => {
    /*if (currentUser == null) {
      navigate("/signin");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError(`the 2 passwords dont match : ${passwordRef.current.value} - ${confirmPasswordRef.current.value}`);
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setError(`Password is too short min is 6`);
      return;
    }*/
    changeTempPassword(passwordRef).then(() => {
      console.log("im waitng")
      //navigate("/");
    }).catch(() => {
      setError("semoething went wrong")
    });

  }

  const handleSignOut = () => {
    logOut().then(() => {
      navigate("/signin");
    })
  }


  const setError = (error) => {
    document.querySelector("#errorText").innerText = error;
  }

  return (
    <div>
      <button onClick={handleSignOut}>log out</button>
      <p className="explanation">
        you are usinga temporary password from your school, please enter a new one,you will always be able to change it later if you forget it
      </p>
      <div>
        <p id="errorText"></p>
      </div>
      <input type={showPassword ? "text" : "password"} placeholder="Password" required ref={passwordRef} className="passwordInput" />
      <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required ref={confirmPasswordRef} className="passwordInput" />
      <button onClick={Submit}>Change</button>
    </div>
  )
}

export default ChangeTempPassword