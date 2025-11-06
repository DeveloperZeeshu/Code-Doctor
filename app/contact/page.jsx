'use client';

import { RiMessage2Line } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { BiLogoInstagram } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import Container from "../../components/container/Container";
import Button from "../../components/ui/Button";
import P from "../../components/ui/P";
import H1 from "../../components/ui/H1";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Link from "next/link";

const Contact = () => {

    const linkItem = [
        {
            link: 'https://www.linkedin.com/in/jeesan-abbas-a51972320',
            icon: <CiLinkedin />
        },
        {
            link: 'https://github.com/DeveloperZeeshu',
            icon: <FaGithub />
        },
        {
            link: 'ttps://www.whatsapp.com/',
            icon: <FaWhatsapp />
        },
        {
            link: 'https://www.instagram.com/zeeshaan_abbas/',
            icon: <BiLogoInstagram />
        },
        {
            link: 'https://web.telegram.org/k/',
            icon: <LiaTelegramPlane />
        }
    ]

    return (
        <>
            <Container>
                <H1
                    text='Contact Us'
                />
                <P
                    text="Have a question or need help? React out us. We're here to help."
                />
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
                                    {
                                        linkItem.map(link => (
                                            <Link key={link.link} href={link.link} target="_blank"><p className="text-[3rem]">{link.icon}</p></Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <form className="w-[30rem] lg:w-[50rem] flex flex-col rounded-4xl py-[2rem] lg:py-[3rem]">
                            <div className="flex flex-col space-y-8">
                                <Input
                                    label='Full Name'
                                    type="text"
                                    placeholder='Enter your full name.'
                                />
                                <Input
                                    label='Email'
                                    type="email"
                                    placeholder='Enter your email.'
                                />
                                <TextArea
                                    label='Message'
                                    placeholder='Enter the message...'
                                />
                            </div>

                            <Button
                                type="submit"
                                className='mt-[3rem]'
                            />
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Contact;
