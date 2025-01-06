import './globals.css';
import { Providers } from './providers';
import { Didact_Gothic } from 'next/font/google';
import { CursorProvider } from './components/CursorContext';

const didactGothic = Didact_Gothic({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-didact-gothic',
  adjustFontFallback: false,
});

export const metadata = {
  title: 'AI Art Gallery',
  description: 'A collection of AI-generated artwork',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${didactGothic.variable} font-sans antialiased bg-light-bg dark:bg-dark-bg`}>
        <Providers>
          <CursorProvider>
            {children}
          </CursorProvider>
        </Providers>
      </body>
    </html>
  );
}
