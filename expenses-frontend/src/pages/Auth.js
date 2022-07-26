import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [formValues, setFormValues] = useState([]);
    const [formRegValues, setFormRegValues] = useState([]);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const onShowLoginForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowRegisterForm(!showRegisterForm);
    }

    const onShowRegForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowLoginForm(!showLoginForm);
    }

    const handeFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    const handeFormRegChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormRegValues((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Usuario: ${formValues.userName}`)
    }

    return (
        <div className="login-page">
            {showLoginForm &&
            <>
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Usuario
                    <input
                        type="text"
                        name='userName'
                        value={formValues.userName || ""}
                        onChange={handeFormChange}/>
                </label>
                <label>
                    Contraseña
                    <input
                        type="password"
                        name='userPass'
                        value={formValues.userPass || ""}
                        onChange={handeFormChange}/>
                </label>
                <input type="submit"/>
            </form>
            <button onClick={onShowRegForm}>No tienes cuenta?</button>
            </>}

            {showRegisterForm &&
            <>
            <form onSubmit={handleSubmit} className="register-form">
                <label>
                    Email
                    <input
                        type="email"
                        name='userMail'
                        value={formRegValues.userMail || ""}
                        onChange={handeFormRegChange}/>
                </label>
                <label>
                    Usuario
                    <input
                        type="text"
                        name='userName'
                        value={formRegValues.userName || ""}
                        onChange={handeFormRegChange}/>
                </label>
                <label>
                    Contraseña
                    <input
                        type="password"
                        name='userPass'
                        value={formRegValues.userPass || ""}
                        onChange={handeFormRegChange}/>
                </label>
                <input type="submit"/>
            </form>
            <button onClick={onShowLoginForm}>Iniciar sesión</button>
            </>}
        </div>
    );
}

export default Login