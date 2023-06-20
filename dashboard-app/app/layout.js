import "./styles/globals.css";
import Navbar from "./navbar";
import AuthSesProvider from "./authSesProvider";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard App",
  description: "Created by John Ramos",
};

export default function RootLayout({ children }) {
  return (
    <AuthSesProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthSesProvider>
  );
}
