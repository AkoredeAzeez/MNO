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
  title: "Margaret Nkem Orakwusi Foundation",
  description: "A nonprofit initiative empowering women and youth through education, mentorship, awareness, and access to opportunities in the maritime industry.",
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
