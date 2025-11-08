'use client';

import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { logout } from "../../../store/authSlice.js";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export const Header = () => {
    const pathname = usePathname();
    const router = useRouter()
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.auth.status)
    const {openSidebar} = useContext(AppContext)

    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/auth/logout')
            if (res.status === 200) {
                toast.success('Logout successfully.')
                dispatch(logout())
                router.push('/auth/login')
            }
        } catch (err) {
            console.log(err)
            toast.error('Unable to logout.')
        }
    }

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Code Explainer',
            slug: '/tools/codeExplainer',
            active: authStatus
        },
        {
            name: 'Code Generator',
            slug: '/tools/codeGenerator',
            active: authStatus
        },
        {
            name: 'Bug Report',
            slug: '/tools/bugReport',
            active: authStatus
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
                
                    {<button onClick={openSidebar} className="lg:hidden text-5xl text-[purple] cursor-pointer pr-[4rem]"><GiHamburgerMenu /></button>}

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
                        <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
                    }
                </div>
            </header>
        </>
    )
}





