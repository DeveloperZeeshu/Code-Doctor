'use client';

import { RiMessage2Line } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { BiLogoInstagram } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        fname: '',
        femail: '',
        message: ''
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
    }

    return (
        <>
            <section className="text-white flex flex-col justify-center items-center text-[1.8rem] max-w-[142rem] px-0 lg:px-[2.4rem] pb-[9.6rem] mx-auto my-auto">
                <h1 className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]">Contact Us</h1>

                <p className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]">Have a question or need help? React out us. We're here to help.</p>

                <div className="grid lg:grid-cols-2 gap-[4rem] justify-center items-center">
                    <div className="flex gap-[5rem] p-[3rem] flex-col h-full w-auto items-center">
                        <div className="flex justify-center items-center gap-3 lg:gap-5">
                            <h3 className="text-[2.4rem] lg:text-[3.5rem]">GET IN TOUCH</h3>
                            <h3 className="text-[2.5rem] lg:text-[3.1rem]"><RiMessage2Line /></h3>
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[2rem] lg:gap-[3rem]">
                            <div className="flex gap-[1.5rem] flex-col justify-center items-center">
                                <h4 className="text-[2.4rem]">Write Us</h4>
                                <a className="text-[#0091ff]" href="mailto:itsabbaszeeshaan0604@gmail.com">itsabbaszeeshaan0604@gmail.com</a>
                            </div>
                            <div className="flex gap-[1.5rem] flex-col justify-center items-center">
                                <h4 className="text-[2.4rem]">Social Media</h4>
                                <div className="flex justify-center items-center gap-[1.5rem]">
                                    <a href='https://www.linkedin.com/in/jeesan-abbas-a51972320' target="_blank"><p className="text-[3rem]"><CiLinkedin /></p></a>
                                    <a href='https://github.com/DeveloperZeeshu' target="_blank"><p className="text-[3rem]"><FaGithub /></p></a>
                                    <a href='https://www.whatsapp.com/' target="_blank"><p className="text-[3rem]"><FaWhatsapp /></p></a>
                                    <a href='https://www.instagram.com/zeeshaan_abbas/' target="_blank"><p className="text-[3rem]"><BiLogoInstagram /></p></a>
                                    <a href='https://web.telegram.org/k/' target="_blank"><p className="text-[3rem]"><LiaTelegramPlane /></p></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <form className="w-[30rem] lg:w-[50rem] flex flex-col rounded-4xl py-[2rem] lg:py-[3rem]" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-[1.5rem] lg:text-3xl" htmlFor="fname">Full Name</label><br />
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.fname}
                                    id="fname"
                                    name="fname"
                                    className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 focus:outline-none"
                                    required autoComplete="off"/><br />

                                <label htmlFor="femail" className="text-[1.5rem] lg:text-3xl">Email</label><br />
                                <input

                                    type="email"
                                    onChange={handleChange}
                                    value={formData.femail}
                                    id="femail"
                                    name="femail"
                                    className="bg-[#333030e7] rounded-[.8rem] p-[1rem] w-[100%] mb-9 mt-3 focus:outline-none"
                                    required autoComplete="off"/><br />

                                <label htmlFor="message" className="text-[1.5rem] lg:text-3xl">Message</label><br />
                                <textarea
                                    name="message"
                                    id="message"
                                    onChange={handleChange}
                                    value={formData.message}
                                    className="bg-[#333030e7] w-full rounded-[.8rem] px-[1rem] py-[1.5rem] h-auto resize-none focus:outline-none mt-3 pb-[3rem]"
                                    placeholder="Write your message here..." required autoComplete="off"/>

                            </div>

                            <input
                                type="submit"
                                className="mt-[3rem] px-[1.5rem] py-3.5 bg-[purple] cursor-pointer mb-[2rem] rounded-[.8rem] hover:bg-[#800080cd]" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Contact;
