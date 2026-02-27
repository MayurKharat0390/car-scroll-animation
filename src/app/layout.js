import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Itfizz | Scroll Animation",
  description: "A premium scroll-driven hero section animation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased font-outfit`}>
        {children}
      </body>
    </html>
  );
}
