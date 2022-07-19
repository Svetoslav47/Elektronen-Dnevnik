import React from 'react'

import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

import "./styles.css"

const MainPage = () => {
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    return (
        <div className='mainPage'>
            <h1 className="studentName">Светослав Б. Илиев 7В</h1>
            <div className="navButtons">
                <button className="navButton">
                    <div>
                        <p>5.1</p>
                        <p>Успех</p>
                    </div>
                </button>
                <button className="navButton">
                    <div>
                        <p>51</p>
                        <p>Отъствия</p>
                    </div>
                </button>
                <button className="navButton">
                    <div>
                        <p>51</p>
                        <p>Отзива</p>
                    </div>
                </button>
                <button className="navButton">Програма</button>
            </div>
            <div className="table">

            </div>
            <button className="chatButton">Chats</button>
        </div>
    )
}

export default MainPage