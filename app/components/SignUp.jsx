'use client';

import { useContext, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

export const SignUp = () => {
    const { setShowSignUp } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <div className="z-20 text-[1.7rem] text-white fixed flex flex-col items-center justify-center bg-[#212121] bg-opacity-50 top-[9rem] rounded-[2rem] p-[3rem] lg:p-[4rem]">

                <div className="w-[100%] flex justify-end">
                    <p className="text-5xl cursor-pointer hover:text-[#800080cd] text-[purple]" onClick={() => setShowSignUp(false)}><IoCloseSharp /></p>
                </div>

                <div className="pb-[5rem]">
                    <h2 className="text-5xl lg:text-6xl pb-5 text-center">Sign Up</h2>
                    <p className="text-[1.6rem]">Create your account to get started</p>
                </div>

                <form action='' className="w-[30rem] lg:w-[40rem] flex flex-col" onSubmit={handleSubmit}>
                    <div>

                        <label
                            className="text-[1.5rem] lg:text-3xl" htmlFor="name">
                            Full Name
                        </label><br />
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 focus:outline-none" type="text"
                            id="name"
                            name="name"
                            required autoComplete="off"/><br />

                        <label
                            className="text-[1.5rem] lg:text-3xl" htmlFor="email">
                            Email
                        </label><br />
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 focus:outline-none" type="email"
                            id="email"
                            name="email"
                            required autoComplete="off"/><br />

                        <label
                            htmlFor="password"
                            className="text-[1.5rem] lg:text-3xl">
                            Password
                        </label><br />
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mt-3 focus:outline-none" type="password"
                            id="password"
                            name="password"
                            required autoComplete="off"/><br />
                    </div>

                    <input
                        type="submit"
                        className="mt-[4.5rem] px-[1.5rem] py-3.5 bg-[purple] cursor-pointer mb-[3rem] rounded-[.8rem] hover:bg-[#800080cd]"></input>
                </form>
            </div>
        </>
    )
}

