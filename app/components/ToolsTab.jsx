import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"
import * as FaIcons from 'react-icons/fa';

export const ToolsTab = ({ content }) => {
    const { title, desc, link, icon } = content;
    const IconComp = FaIcons[icon];
    return (
        <div className="bg-[#1d1c1cbc] flex flex-col justify-center items-center h-auto max-w-[30rem] rounded-3xl w-auto lg:w-[30rem] cursor-pointer hover:scale-105 transform transition-transform duration-300">
            <div className="w-full relative">
                <Image 
                    src="/images/cardBg.webp"
                    alt="Tool Tab Image"
                    width={500}
                    height={300}
                    className="w-full rounded-3xl object-cover h-auto lg:h-[16rem]" 
                    priority
                    />

                <div className="absolute inset-0 flex flex-col gap-[4rem] p-[2rem]">
                    <div className="bg-white h-[4rem] w-[4rem] rounded-full flex justify-center items-center text-4xl text-black"><IconComp /></div>
                    <h2 className='text-[2.5rem] font-bold'>{title}</h2>
                </div>
            </div>
            <div className="p-[2rem] flex flex-col content-center items-center gap-[2rem]">
                <p className='text-center'>{desc}</p>
                <Link href={link} aria-label={`Go to ${title}`} className="text-[1.6rem] p-[1.5rem] bg-[purple] rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:bg-[#800080cd]"><FaArrowRight /></Link>
            </div>
        </div>
    )
}


