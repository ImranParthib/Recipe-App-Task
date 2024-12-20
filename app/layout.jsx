import localFont from "next/font/local";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import Footer from "@/components/Footer";
import ClientBodyWrapper from "@/components/ClientBodyWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tailus Feedus",
  description: "Discover and save your favorite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientBodyWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <AuthProvider>
            <CartProvider>
              <TanstackProvider>
                <NavbarWrapper />
                <main className="flex-grow">{children}</main>
                <div className="mt-16">
                  <Footer />
                </div>
              </TanstackProvider>
            </CartProvider>
          </AuthProvider>
        </body>
      </ClientBodyWrapper>
    </html>
  );
}
