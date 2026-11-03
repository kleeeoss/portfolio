import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08080a',
};

export const metadata: Metadata = {
  title: 'Garv Vaidya | Systems, Cloud Infrastructure & Applied AI Engineer',
  description:
    'Systems-focused engineer architecting hardened container sandboxes, distributed workflow engines, and disaggregated high-throughput vector search infrastructure. Pure-Go AST taint analysis, Google gVisor runsc isolation, and contract-first LLM orchestration.',
  keywords: [
    'Garv Vaidya',
    'kleeeoss',
    'Systems Engineer',
    'Cloud Infrastructure',
    'Distributed Systems',
    'Lucid-CI',
    'Ares',
    'Leviathan',
    'SyncNote',
    'gVisor runsc',
    'Go Tree-sitter',
    'Kubernetes',
    'BLAS GEMV',
    'Python',
    'FastAPI',
  ],
  authors: [{ name: 'Garv Vaidya', url: 'https://github.com/kleeeoss' }],
  creator: 'Garv Vaidya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/kleeeoss/portfolio',
    title: 'Garv Vaidya | Systems, Cloud Infrastructure & Applied AI Engineer',
    description:
      'Architecting hardened container isolation sandboxes, distributed workflow engines, and disaggregated high-throughput vector search infrastructure.',
    siteName: 'Garv Vaidya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garv Vaidya | Systems, Cloud Infrastructure & Applied AI Engineer',
    description:
      'Hardcore systems engineering: pure-Go AST taint analysis, Google gVisor runsc sandboxing, disaggregated Kubernetes vector retrieval, Kahn DAG schedulers.',
    creator: '@Garv_Vaidya',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#08080a] text-[#f3f4f6] min-h-screen antialiased selection:bg-[#38bdf8]/20 selection:text-[#38bdf8]`}
      >
        {children}
      </body>
    </html>
  );
}
