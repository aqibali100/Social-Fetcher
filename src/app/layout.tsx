import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  seoProps = {
    title: "Default Title",
    description: "Default description for the page.",
    keywords: "default, keywords, page",
    author: "Default Author",
    ogImage: "/images/default-og-image.jpg",
  },
}: Readonly<{
  children: React.ReactNode;
  seoProps?: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    ogImage: string;
  };
}>) {
  return (
    <html lang="en">
      <head>
        <title>{seoProps.title}</title>
        <meta name="description" content={seoProps.description} />
        <meta name="keywords" content={seoProps.keywords} />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
