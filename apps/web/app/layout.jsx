import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingContactButtons from '../components/FloatingContactButtons';

export const metadata = {
  metadataBase: new URL('https://www.chennaijothimatrimony.com'),
  title: 'Chennai Jothi Matrimony - Authentic Tamil Horoscope & Matchmaking',
  description: 'Chennai Jothi Matrimony (Dr. Chandrababu). Tamil Matrimony platform with 10 Porutham horoscope matching, verified profiles across Tamil Nadu, and ₹1,000 one-time registration fee.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
            <FloatingContactButtons />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
