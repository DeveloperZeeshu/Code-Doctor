import ToolTabData from '../app/api/ToolsTabData';
import { ToolsTab } from './components/ToolsTab';

const Home = () => {
    return (
        <>
            <main className="text-white flex flex-col justify-center items-center  text-[1.8rem] max-w-[142rem] px-0 lg:px-[2.4rem] pb-[9.6rem] mx-auto my-auto">

                {<h1 className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]">AI That Codes, Explains & Debugs For You</h1>}

                {<p className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]">Your all-in-one AI coding partner to write code, debug issues, and explain any code.</p>}

                <div className="grid gap-[4rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center items-center">
                    {
                        ToolTabData.map(curElem => {
                            return <ToolsTab content={curElem} key={curElem.id} />
                        })
                    }
                </div>

            </main>
        </>
    )
}

export default Home;

