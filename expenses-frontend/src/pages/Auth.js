import React from 'react'
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom"
import loginImg from '../assets/login.png'
import registerImg from '../assets/register.png'



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
        <div className='bg-gradient-to-r from-green-400 via-cyan-900 to-blue-500 h-screen'>
            <div>
                {showLoginForm &&
                <div className='flex flex-row justify-around pt-36'>
                    <img src={loginImg} alt='login' className='w-80 h-80'/>
                    <form onSubmit={handleSubmit} className="rounded-lg border-cyan-400 border-2 p-5">
                        <div class="grid gap-6 mb-6 md:grid-cols-1">
                            <div>
                                <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 ">User</label>
                                <input type="text" id="userName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required 
                                value={formValues.userName || ""}
                                onChange={handeFormChange}
                                name="userName"/>
                            </div>
                            <div class="mb-6">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required 
                                value={formValues.userPass || ""}
                                onChange={handeFormChange}
                                name="userPass"/>
                            </div> 
                            <div className='grid gap-6 mb-6 md:grid-cols-2'>
                                <Link to={'/home'}><input type="submit" value="Iniciar Sesión" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"/></Link>
                                <button onClick={onShowRegForm} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">No tienes cuenta?</button>
                            </div>
                        </div>
                    </form>
                </div>}
                {showRegisterForm &&
                <div className='flex flex-row justify-around pt-32'>
                <img src={registerImg} alt='register' className='w-80 h-80'/>
                <form onSubmit={handleSubmit} className="rounded-lg border-cyan-400 border-2 p-5">
                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                            <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 ">User</label>
                            <input type="text" id="userName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required 
                            name='userName'
                            value={formRegValues.userName || ""}
                            onChange={handeFormRegChange}/>
                        </div>
                        <div class="mb-6">
                            <label for="userMail" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                            <input type="email" id="userMail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="john.doe@company.com" required
                            name='userMail'
                            value={formRegValues.userMail || ""}
                            onChange={handeFormRegChange}/>
                        </div> 
                        <div class="mb-6">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required 
                            name='userPass'
                            value={formRegValues.userPass || ""}
                            onChange={handeFormRegChange}/>
                        </div> 
                        <div className='grid gap-6 mb-6 md:grid-cols-2'>
                            <Link to={'/home'}><input type="submit" value="Registrarse" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"/></Link>
                            <button onClick={onShowLoginForm} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Ya tienes cuenta?</button>
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