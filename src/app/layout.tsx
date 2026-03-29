import type { Metadata } from "next";
import "./globals.css";
import { professionalName, description } from "@/lib/siteInfo";

export const metadata: Metadata = {
  title: `${professionalName} | Senior Software Engineer`,
  description,
  keywords: [
    "software engineer",
    "developer",
    "enterprise",
    "architecture",
    "manufacturing",
    "Mitrasoft",
    "SQL Server",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-dark-text antialiased">
        {children}
      </body>
    </html>
  );
}
