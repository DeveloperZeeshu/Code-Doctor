import { Header } from './components/Header';
import { AppProvider } from './context/AppContext';
import './globals.css';

export const metadata = {
  title: {
    default: "Code Doctor - AI Powered Code Assistant",
    template: "%s | Code Doctor",
  },
  description: "Code Doctor is your AI-powered coding assistant that explains code, generates code snippets, creates bug reports, and exports reports to PDF — all in one platform.",
  keywords: [
    "Code Doctor",
    "AI Code Assistant",
    "Code Explanation",
    "Code Generation",
    "Bug Report Generator",
    "Export to PDF",
    "AI Developer Tools",
    "Code Debugging",
    "Programming Assistant",
    "AI Coding Platform"
  ],
  authors: [{ name: "Zeeshaan Abbas" }],
  creator: "Zeeshaan Abbas",
  publisher: "Code Doctor AI",
  robots: "index, follow",
  metadataBase: new URL("https://your-domain.com"),  // replace with your real domain
  openGraph: {
    title: "Code Doctor - AI Powered Code Assistant",
    description: "Explain, generate, and debug code using advanced AI models. Generate bug reports and export them to PDF with ease.",
    url: "https://your-domain.com",
    siteName: "Code Doctor",
    images: [
      {
        url: "https://your-domain.com/og-image.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Code Doctor AI Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Doctor - AI Powered Code Assistant",
    description: "AI-powered coding platform for developers. Explain code, generate code, debug and export bug reports to PDF.",
    site: "@your-twitter-handle",  // optional
    images: ["https://your-domain.com/og-image.png"],
  },
  category: "technology",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <html className='text-[62.5%]' lang='en'>
        <body className='bg-[#0e0d0d] mx-0 my-auto px-[3.2rem] min-w-[32rem]'>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </body>
      </html>
    </>
  )
}

export default RootLayout;
