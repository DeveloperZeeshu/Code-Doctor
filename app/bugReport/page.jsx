'use client';

import { useState } from "react"
import { BugReport } from "../components/BugReport";
import { getResponse } from "../utils/GeminiRequest";
import { getBugReportPrompt } from '../utils/bugReportPrompt';

const BugReportGenerator = () => {
    const [report, setReport] = useState('');
    const [userInput, setUserInput] = useState({
        description: '',
        code: '',
        environment: '',
        severity: 'low',
        steps: ''
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

        setReport('');

        const prompt = getBugReportPrompt(userInput);

        const result = await getResponse(prompt);
        setReport(result);

        setUserInput({
            description: '',
            code: '',
            steps: '',
            severity: '',
            environment: ''
        });
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center text-white text-[1.8rem] max-w-[142rem] px-0 lg:px-[2.4rem] pb-[9.6rem] mx-auto my-auto">

                {<h1 className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]">Bug Report Generator</h1>}

                {<p className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]">AI-powered tool to find, explain, and document bugs in your code faster than ever.</p>}

                <form onSubmit={handleSubmit} className={`w-full lg:w-auto flex flex-col justify-center items-center gap-[2.5rem] bg-[#1d1c1cbc] rounded-4xl mb-[3rem] p-[2rem]`}>

                    {/* Code Description */}
                    <div className="flex flex-col w-full">
                        <label htmlFor='description' className='pb-[.8rem]'>📝 Bug Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="e.g., Type mismatch causing if-condition to fail"
                            className={"bg-[#282828] p-[2rem] rounded-4xl  h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"} value={userInput.description} onChange={handleChange} required />
                    </div>

                    {/* Code Block */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="code" className='pb-[.8rem]'>💻 Code Snippet (if any)</label>
                        <textarea
                            name="code"
                            id="code"
                            placeholder="Paste code related to the bug..."
                            className={"bg-[#282828] p-[2rem] rounded-4xl h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"} value={userInput.code} onChange={handleChange} />
                    </div>

                    {/* Steps to Reproduce */}
                    <div className="flex flex-col w-full">
                        <label htmlFor='steps' className='pb-[.8rem]'>📋 Steps to Reproduce</label>
                        <textarea
                            name="steps"
                            id="steps"
                            placeholder="e.g., 1. Open app → 2. Click Login → 3. Error appears"
                            className={"bg-[#282828] p-[2rem] rounded-4xl h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"} value={userInput.steps} onChange={handleChange} required />
                    </div>

                    {/* Environment */}
                    <div className="flex flex-col w-full">
                        <label htmlFor='environment' className='pb-[.8rem]'>🧪 Test Environment</label>
                        <textarea
                            name="environment"
                            id="environment"
                            placeholder="e.g., Windows 11, Chrome v123.0, React 18.2.0"
                            className={"bg-[#282828] p-[2rem] rounded-4xl h-[12rem] w-full lg:w-[80rem] focus:outline-none resize-none rounded-r-2xl text-white"} value={userInput.environment} onChange={handleChange} required />
                    </div>

                    {/* Severity Level */}
                    <div className="flex flex-col w-full max-w-full overflow-hidden">
                        <label htmlFor='severity' className="pb-[.8rem]">🚨 Severity</label>
                        <select
                            className="bg-[#282828] w-full rounded-[.6rem] focus:outline-none px-[1.5rem] py-4 cursor-pointer max-w-full overflow-x-hidden"
                            value={userInput.severity}
                            onChange={handleChange}
                            name="severity"
                            id="severity"
                        >
                            <option value='low'>Low</option>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
                            <option value='critical'>Critical</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center gap-9 lg:w-[80rem]">
                        <button onClick={() => alert('Coming Soon...')} className="text-[1.6rem] lg:px-[2rem] px-[1rem] py-3.5 border-3 border-[purple] rounded-[.8rem] cursor-pointer hover:border-[#800080cd]">Upload File</button>

                        <button type="submit" className="text-[1.8rem] lg:px-[3rem] px-[1rem] py-4 bg-[purple] rounded-[.8rem] cursor-pointer hover:bg-[#800080cd]">Generate Report</button>
                    </div>
                </form>
                {report && <BugReport response={report} />}
            </section>
        </>
    )
}


export default BugReportGenerator;