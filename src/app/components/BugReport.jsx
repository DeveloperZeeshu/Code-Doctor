import { BiExport } from "react-icons/bi";
import { lazy, Suspense } from "react";
const MarkDownViewer = lazy(() => import('./MarkDownViewer'));

export const BugReport = ({ response }) => {

    return (
        <>
            <div className="text-black rounded-4xl h-auto w-full lg:w-[80rem]">
                <div className="bg-[#282828e7] p-[1rem] text-white rounded-t-4xl flex justify-between items-center ">
                    <h2 className="text-[2.2rem] font-[400]">🔍 Bug Report</h2>
                    <div className="gap-[2.5rem] flex justify-between items-center">
                        <button className="cursor-pointer text-[1.6rem] bg-[purple] hover:bg-[#800080cd] rounded-[.5rem] px-[1rem] py-[.8rem]"><span className="flex justify-between items-center gap-2"><BiExport /> Export as pdf</span></button>
                    </div>
                </div>
                <div className="py-[3rem] divres px-[1rem] lg:px-[3rem] bg-[#ffffff] rounded-b-4xl">
                    <Suspense fallback={<div>Loading...</div>}>
                        <MarkDownViewer content={response} />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

