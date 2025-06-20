'use client';

import { useContext } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { HamMenu } from "../components/HamMenu";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import Link from "next/link";
import { AppContext } from "../context/AppContext";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();

    const { openLogin, openSignUp, isHamOpen, openHam, showLog, showSignUp } = useContext(AppContext);
    return (
        <>
            <header className="text-white text-[1.8rem] px-0 max-w-[142rem] lg:px-[2.4rem] pt-[2.4rem] pb-[9.6rem] mx-auto my-auto flex justify-center">
                <div className="flex items-center justify-between sm:gap-2 relative w-full">
                    {isHamOpen && <HamMenu />}
                    {!isHamOpen && <p onClick={openHam} className="lg:hidden text-5xl text-[purple] cursor-pointer pr-[4rem]"><GiHamburgerMenu /></p>}

                    <div className="">
                        {/* <img src="" alt="brand" /> */}
                        <Link href='/' className="text-[2.5rem] cursor-pointer hidden lg:flex">Code Doctor</Link>
                    </div>
                    <div className="hidden lg:flex text-center items-center gap-[4rem]">
                        <Link className={pathname === '/' ? 'text-[#d107f5] font-[500]' : ''} href='/'>Home</Link>
                        <Link className={pathname === '/codeExplainer' ? 'text-[#d107f5] font-[500]' : ''} href='/codeExplainer'>Code Explainer</Link>
                        <Link className={pathname === '/codeGenerator' ? 'text-[#d107f5] font-[500]' : ''} href='/codeGenerator'>Code Generator</Link>
                        <Link className={pathname === '/bugReport' ? 'text-[#d107f5] font-[500]' : ''} href='/bugReport'>Bug Report</Link>
                        <Link className={pathname === '/contact' ? 'text-[#d107f5] font-[500]' : ''} href='/contact'>Contact Us</Link>
                    </div>
                    <div className="flex gap-[3.5rem]">
                        <button className="cursor-pointer" onClick={openLogin}>Sign In</button>
                        <button className="text-[1.6rem] px-[1.5rem] py-3.5 bg-[purple] rounded-[.8rem] cursor-pointer hover:bg-[#800080cd]" onClick={openSignUp}>Get Started</button>
                    </div>
                </div>
                {showLog && <SignIn />}
                {showSignUp && <SignUp />}
            </header>
        </>
    )
}





