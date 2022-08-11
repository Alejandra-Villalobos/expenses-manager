import React from 'react'
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom"
import loginImg from '../assets/login.png'

const Login = () => {
    const [loginFormValues, setLoginFormValues] = useState([]);
    const [regFormValues, setRegFormValues] = useState([]);

    //Toggle login/registration forms
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

    //Handle login form
    const handleLoginFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginFormValues((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    //Handle registration form
    const handleRegFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegFormValues((values)=>{
            return{
                ...values,
                [name]: value
            };
        });
    };

    //Handle registration form submit
    const handleRegSubmit = (e) => {
        e.preventDefault();
        if(regFormValues.userPass !== regFormValues.userPassConf){
            alert(`Las contraseñas no coinciden`)
            return
        }
        alert(`Usuario: ${regFormValues.userName}`)
    }

    //Handle login form submit
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if(regFormValues.userPass !== regFormValues.userPassConf){
            alert(`Las contraseñas no coinciden`)
            return
        }
        alert(`Usuario: ${regFormValues.userName}`)
    }

    return (
        <div className='bg-gradient-to-br from-sky-400 to-indigo-900 h-screen'>
            <div className='h-screen'>
                <h1 className='text-center text-white pt-12 font-fira font-bold text-4xl'>Welcome to Expenses Manager!</h1>
                {showLoginForm &&
                <div className='flex flex-row justify-around items-center h-5/6'>
                    <img src={loginImg} alt='login' className='w-80 h-80 drop-shadow-md'/>
                    <form onSubmit={handleLoginSubmit} className="bg-white rounded-lg border-gray-300 shadow-md border-1 p-5">
                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">User</label>
                                <input type="text" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required 
                                value={loginFormValues.userName || ""}
                                onChange={handleLoginFormChange}
                                name="userName"/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required 
                                value={loginFormValues.userPass || ""}
                                onChange={handleLoginFormChange}
                                name="userPass"/>
                            </div> 
                            <div className='grid gap-6 mb-6 md:grid-cols-2'>
                                <Link to={'/home'}><input type="submit" value="Iniciar Sesión" className="text-white shadow-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"/></Link>
                                <button onClick={onShowRegForm} className="text-white shadow-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">No tienes cuenta?</button>
                            </div>
                        </div>
                    </form>
                </div>}
                {showRegisterForm &&
                <div className='flex flex-row justify-around items-center h-5/6'>
                <img src={loginImg} alt='register' className='w-80 h-80'/>
                <form onSubmit={handleRegSubmit} className="bg-white rounded-lg border-gray-300 shadow-md border-1 p-5">
                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">User</label>
                            <input type="text" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required 
                            name='userName'
                            value={regFormValues.userName || ""}
                            onChange={handleRegFormChange}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                            <input type="email" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required
                            name='userMail'
                            value={regFormValues.userMail || ""}
                            onChange={handleRegFormChange}/>
                        </div> 
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required 
                            name='userPass'
                            value={regFormValues.userPass || ""}
                            onChange={handleRegFormChange}/>
                        </div> 
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Password Confirmation</label>
                            <input type="password" className="bg-white shadow-inner border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required 
                            name='userPassConf'
                            value={regFormValues.userPassConf || ""}
                            onChange={handleRegFormChange}/>
                        </div> 
                        <div className='grid gap-6 mb-6 md:grid-cols-2'>
                            <Link to={'/home'}><input type="submit" value="Registrarse" className="text-white shadow-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"/></Link>
                            <button onClick={onShowLoginForm} className="text-white shadow-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Ya tienes cuenta?</button>
                        </div>
                    </div>
                </form>
            </div>}
            </div>
            <Outlet/>
        </div>
    );
}

export default Login