import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { logout } from "../../../store/authSlice.js"
import { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

const Sidebar = () => {
    const router = useRouter()
    const authStatus = useSelector(state => state.auth.status)
    const pathname = usePathname()
    const dispatch = useDispatch()
    const { closeSidebar } = useContext(AppContext)

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
            <div className="bg-[#202123] p-[1.5rem] text-white text-[1.8rem] flex flex-col justify-start items-center fixed left-0 z-10 h-screen w-[27rem] rounded-r-3xl gap-9">
                <div className="w-full text-right">
                    <button onClick={closeSidebar} className="text-pink-500 cursor-pointer text-[3rem]"><IoClose /></button>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="">
                        <Link href='/' className="text-[2.5rem] cursor-pointer">Code Doctor</Link>
                    </div>
                    <div className="flex flex-col text-center items-center gap-6">
                        {
                            navItems.map(navLink => (
                                navLink.active && <Link onClick={closeSidebar} key={navLink.slug} href={navLink.slug} className={pathname === navLink.slug ? 'text-[#d107f5] font-[500]' : ''}>{navLink.name}</Link>
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
                        <button className="cursor-pointer mt-8" onClick={handleLogout}>Logout</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar

