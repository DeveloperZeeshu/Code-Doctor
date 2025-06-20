'use client';

import { lazy, Suspense, useRef, useState } from "react"
import { getResponse } from "../utils/GeminiRequest";
const MarkDownViewer = lazy(() => import('../components/MarkDownViewer'));
import { getCodeGenPrompt } from "../utils/getCodeGenPrompt";

const WriteCode = () => {
    const [generatedCode, setGeneratedCode] = useState('');
    const [message, setMessage] = useState([]);
    const [userInput, setUserInput] = useState({
        prompt: '',
        lang: '',
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
        const promptTxt = getCodeGenPrompt(userInput.prompt, userInput.lang);

        const result = await getResponse(promptTxt);

        const userMessage = { role: 'user', text: userInput.prompt };
        const aiResponse = { role: 'ai', text: result };

        setMessage((prev) => [...prev, userMessage, aiResponse]);
        setGeneratedCode(result);

        setUserInput({ prompt: '', lang: '' });
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center text-white text-[1.8rem] max-w-[142rem] px-0 lg:px-[2.4rem] pb-[9.6rem] mx-auto my-auto">

                {<h1 className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]">Code Generator</h1>}

                {<p className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]">AI-powered tool to Generate high quality code as per your need.</p>}

                {<div className="flex gap-[4rem] flex-col items-end w-full lg:w-[80rem] ">
                    {
                        message.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? "bg-[#282828] rounded-4xl h-auto w-auto max-w-[50rem] px-[2rem] py-[1rem]" : 'bg-[#191919] rounded-4xl h-auto divres w-full lg:w-[80rem] lg:px-[3rem] px-[1rem] py-[3rem] last:mb-[15rem]'}>
                                {msg.role === 'user' ? msg.text :
                                    <Suspense fallback={<div>Loading..</div>}>
                                        <MarkDownViewer content={msg.text} />
                                    </Suspense>
                                }
                            </div>
                        ))
                    }
                </div>
                }

                <div className={generatedCode ? 'rounded-t-4xl fixed bottom-0 bg-[#0e0d0d] px-[3.2rem] w-full lg:w-[80rem]' : 'bg-[#0e0d0d] rounded-t-4xl w-full'}>
                    <form className={` flex pb-6 flex-col justify-center items-center gap-[2rem]`} onSubmit={handleSubmit}>
                        <textarea
                            name="prompt"
                            placeholder="e.g., Create an Login Form, etc."
                            className={"bg-[#282828] p-[3rem] rounded-4xl h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"}
                            value={userInput.prompt}
                            onChange={handleChange}
                            required />

                        <div className="flex justify-center items-center gap-9 lg:w-[80rem]">
                            <input
                                type="text"
                                name='lang'
                                placeholder="Language?"
                                className="bg-[#282828] w-[13rem] px-[2rem] py-[1rem] rounded-2xl"
                                value={userInput.lang}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="text-[1.8rem] lg:px-[3rem] px-[1rem] py-4 bg-[purple] rounded-[.8rem] cursor-pointer hover:bg-[#800080cd]">Generate</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}


export default WriteCode;
