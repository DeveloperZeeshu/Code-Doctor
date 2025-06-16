'use client';

import { lazy, Suspense, useState } from "react"
import { getExplanationPrompt } from '../utils/getExplanationPrompt';
const MarkDownViewer = lazy(() => import('../components/MarkDownViewer'));

import { getResponse } from '../utils/GeminiRequest';

const CodeExplainer = () => {
    const [explainResponse, setExplainResponse] = useState('');
    const [message, setMessage] = useState([]);

    const [userInput, setUserInput] = useState({
        query: '',
        level: 'Beginner',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInput(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = getExplanationPrompt(userInput.query, userInput.level);

        const result = await getResponse('bubble sort in python');

        const userMessage = { role: 'user', text: userInput.query };
        const aiResponse = { role: 'ai', text: result };

        setMessage((prev) => [...prev, userMessage, aiResponse]);
        setExplainResponse(result);

        setUserInput({ query: '', level: '' });
    }

    return (
        <>
            <section className="text-white flex flex-col justify-center items-center  text-[1.8rem] max-w-[142rem] px-0 lg:px-[2.4rem] pb-[9.6rem] mx-auto my-auto">

                {<h1 className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]">Code Explainer</h1>}

                {<p className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]">AI-powered tool that helps you to understand Complex Code Snippets Instantly.</p>}

                {<div className="flex gap-[4rem] flex-col items-end w-full lg:w-[80rem]">
                    {
                        message.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? "bg-[#282828] rounded-4xl h-auto w-auto max-w-[50rem] px-[2rem] py-[1rem]" : 'bg-[#191919] rounded-4xl h-auto w-full divres lg:w-[80rem] lg:px-[3rem] px-[1rem] py-[3rem] last:mb-[15rem]'}>
                                {msg.role === 'user' ? msg.text :
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <MarkDownViewer content={msg.text} />
                                    </Suspense>}
                            </div>
                        ))
                    }
                </div>
                }

                <div className={explainResponse ? 'rounded-t-4xl fixed bottom-0 bg-[#0e0d0d] px-[3.2rem] w-full lg:w-[80rem]' : 'bg-[#0e0d0d] rounded-t-4xl w-full'}>
                    <form className={` flex pb-6 flex-col justify-center items-center gap-[2rem]`} onSubmit={handleSubmit}>
                        <textarea
                            name="query"
                            placeholder="Paste your code here..."
                            className={"bg-[#282828] p-[3rem] rounded-4xl h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"}
                            onChange={handleChange}
                            value={userInput.query} required />

                        <div className="flex justify-between items-center gap-9 lg:w-[80rem]">
                            <div className="w-[16.5rem] lg:w-[18rem] bg-[#282828] rounded-[.6rem]">
                                <select name="level" className="bg-[#282828] rounded-[.6rem] focus:outline-none lg:px-[2rem] px-[1.5rem] py-4 cursor-pointer" onChange={handleChange} value={userInput.level}>
                                    <option value='beginner'>Beginner</option>
                                    <option value='intermediate'>Intermediate</option>
                                    <option value='advance'>Advance</option>
                                </select>
                            </div>
                            <button type="submit" className="text-[1.8rem] lg:px-[3rem] px-[2rem] py-4 bg-[purple] rounded-[.8rem] cursor-pointer hover:bg-[#800080cd]">Explain</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}


export default CodeExplainer;

