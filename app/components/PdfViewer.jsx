'use client';

import { PDFViewer } from "@react-pdf/renderer";
import BugReportPdf from "../generatePdf/BugReportPdf";

const PdfViewer = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#1e1e1e' }}>
            <PDFViewer
                width="100%"
                height="800px"
                style={{
                    border: '2px solid #fff',
                    backgroundColor: '#ffffff',
                }}
            >
                <BugReportPdf />
            </PDFViewer>
        </div>
    )
}

export default PdfViewer;
