import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Factory Tycoon 2D',
  description: 'Gezegende mahsur kalan astronotun fabrika kurma macerası',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#0f0f1a] text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
