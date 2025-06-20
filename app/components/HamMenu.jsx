'use client';

import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HamMenu = () => {
    const { setIsHamOpen } = useContext(AppContext);

    const pathname = usePathname();

    return (
        <>
            <div className="absolute top-0 bg-[#212121] flex flex-col justify-center items-center rounded-2xl p-[4rem] gap-[2.5rem] z-20">
                <div className="w-[100%] flex justify-end">
                    <p onClick={() => setIsHamOpen(false)} className="text-5xl cursor-pointer hover:text-[#800080cd] text-[purple]"><IoCloseSharp /></p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {/* <img src="" alt="brand" /> */}
                    <Link onClick={() => setIsHamOpen(false)} href='/' className="text-[2.5rem] cursor-pointer text-center">Code Doctor</Link>
                </div>
                <div className="flex flex-col justify-center items-center gap-[1rem]">
                    <Link onClick={() => setIsHamOpen(false)} className={pathname === '/' ? 'text-[#d107f5] font-[500]': ''} href='/'>Home</Link>
                        <Link onClick={() => setIsHamOpen(false)} className={pathname === '/codeExplainer' ? 'text-[#d107f5] font-[500]': ''} href='/codeExplainer'>Code Explainer</Link>
                        <Link onClick={() => setIsHamOpen(false)} className={pathname === '/codeGenerator' ? 'text-[#d107f5] font-[500]': ''} href='/codeGenerator'>Code Generator</Link>
                        <Link onClick={() => setIsHamOpen(false)} className={pathname === '/bugReport' ? 'text-[#d107f5] font-[500]': ''} href='/bugReport'>Bug Report</Link>
                        <Link onClick={() => setIsHamOpen(false)} className={pathname === '/contact' ? 'text-[#d107f5] font-[500]': ''} href='/contact'>Contact Us</Link>
                </div>
            </div>
        </>
    )
}

