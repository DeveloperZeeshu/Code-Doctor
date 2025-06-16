'use client'

import { useContext, useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

export const SignIn = () => {
    const { setShowLog, openSignUp } = useContext(AppContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <div className="z-20 text-[1.7rem] text-white fixed flex flex-col items-center justify-center bg-[#212121] top-[9rem] rounded-[2rem] p-[3rem] lg:p-[4rem]">

                <div className="w-[100%] flex justify-end">
                    <p className="text-5xl cursor-pointer hover:text-[#800080cd] text-[purple]" onClick={() => setShowLog(false)}><IoCloseSharp /></p>
                </div>

                <div className="pb-[5rem]">
                    <h2 className="text-5xl lg:text-6xl pb-5 text-center">Welcome Back</h2>
                    <p className="text-[1.6rem]">Please Sign in to your account</p>
                </div>

                <form className="w-[30rem] lg:w-[40rem] flex flex-col" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="text-[1.5rem] lg:text-3xl" htmlFor="email">Email</label><br />
                        <input onChange={handleOnChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            name="email"
                            className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 focus:outline-none"
                            required autoComplete="off"/><br />

                        <label htmlFor="password" className="text-[1.5rem] lg:text-3xl">Password</label><br />
                        <input
                            onChange={handleOnChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            name="password"
                            className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mt-3 focus:outline-none"
                            required autoComplete="off"/><br />
                            <p className="cursor-pointer text-blue-400 text-right text-2xl">Forgot Password?</p>
                    </div>

                    <input
                        type="submit"
                        className="mt-[3rem] px-[1.5rem] py-3.5 bg-[purple] cursor-pointer mb-[2rem] rounded-[.8rem] hover:bg-[#800080cd]" />
                </form>
                <p>Don't have an account? <span onClick={openSignUp} className=" text-blue-400 cursor-pointer">Sign Up</span></p>
            </div>
        </>
    )
}




