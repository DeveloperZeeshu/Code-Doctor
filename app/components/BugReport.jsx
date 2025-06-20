'use client';

import { BiExport } from "react-icons/bi";
import { pdf } from '@react-pdf/renderer';
import { lazy, Suspense } from "react";
import { extractBugReportData } from "../generatePdf/extractReportData";
import BugReportPdf from "../generatePdf/BugReportPdf";
const MarkDownViewer = lazy(() => import('./MarkDownViewer'));

export const BugReport = ({ response }) => {
    const generatePdf = async () => {
        const report = extractBugReportData(response);
        try {
            const blob = await pdf(<BugReportPdf report={report} />).toBlob();

            if (!blob || blob.size === 0) {
                alert('PDF generation failed.');
                return;
            }

            const blobURL = URL.createObjectURL(blob);
            window.open(blobURL, '_blank');
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = 'bug-report.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobURL);

        } catch (err) {
            console.error('Download failed:', err);
            alert('Something went wrong while generating the PDF.');
        }
    };

    return (
        <>
            <div className="text-black rounded-4xl h-auto w-full lg:w-[80rem]">
                <div className="bg-[#282828e7] p-[1rem] text-white rounded-t-4xl flex justify-between items-center ">
                    <h2 className="text-[2.2rem] font-[400]">🔍 Bug Report</h2>
                    <div className="gap-[2.5rem] flex justify-between items-center">
                        <button onClick={generatePdf} className="cursor-pointer text-[1.6rem] bg-[purple] hover:bg-[#800080cd] rounded-[.5rem] px-[1rem] py-[.8rem]"><span className="flex justify-between items-center gap-2"><BiExport /> Export as pdf</span></button>
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

