import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './component.css';
/*import './animations.css'; /* optional separate file */


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Redraw Initiative",
  description: "A non-profit organization dedicated to empowering communities through art and education.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
