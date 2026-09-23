import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Chennai Jothi Matrimony - Authentic Tamil Horoscope & Matchmaking',
  description: 'Chennai Jothi Matrimony (Dr. Chandrababu). Tamil Matrimony platform with 10 Porutham horoscope matching, verified profiles across Tamil Nadu, and ₹1,000 one-time registration fee.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
