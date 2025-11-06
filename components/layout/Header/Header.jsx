'use client';

import { useContext } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/Button";
import { AppContext } from "../../../context/AppContext";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter()
    const { isHamOpen, openHam } = useContext(AppContext);
    const authStatus = false

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Code Explainer',
            slug: '/tools/codeExplainer',
            active: true
        },
        {
            name: 'Code Generator',
            slug: '/tools/codeGenerator',
            active: true
        },
        {
            name: 'Bug Report',
            slug: '/tools/bugReport',
            active: true
        },
        {
            name: 'Contact Us',
            slug: '/contact',
            active: true
        },
    ]

    return (
        <>
            <header className="text-white text-[1.8rem] px-0 max-w-[142rem] lg:px-[2.4rem] pt-[2.4rem] pb-[9.6rem] mx-auto my-auto flex justify-center">
                <div className="flex items-center justify-between sm:gap-2 relative w-full">
                    {isHamOpen && <HamMenu />}
                    {!isHamOpen && <p onClick={openHam} className="lg:hidden text-5xl text-[purple] cursor-pointer pr-[4rem]"><GiHamburgerMenu /></p>}

                    <div className="">
                        <Link href='/' className="text-[2.5rem] cursor-pointer hidden lg:flex">Code Doctor</Link>
                    </div>
                    <div className="hidden lg:flex text-center items-center gap-[4rem]">
                        {
                            navItems.map(navLink => (
                                navLink.active && <Link key={navLink.slug} href={navLink.slug} className={pathname === navLink.slug ? 'text-[#d107f5] font-[500]' : ''}>{navLink.name}</Link>
                            ))
                        }
                    </div>
                    {!authStatus ?
                        <div className="flex gap-[3.5rem]">
                            <button onClick={() => router.push('/auth/login')} className="cursor-pointer">Sign In</button>
                            <Button
                                text='Get Started'
                                onClick={() => router.push('/auth/register')}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </header>
        </>
    )
}





