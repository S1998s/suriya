import type { Metadata } from "next";
import "./globals.css";
import { professionalName, description } from "@/lib/siteInfo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: `${professionalName}`,
  description,
  keywords: [
    "software engineer",
    "developer",
    "enterprise",
    "architecture",
    "manufacturing",
    "Mitrasoft",
    "SQL Server",
    "coldfusion",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={`${basePath}/logo.png`} />
        <link rel="apple-touch-icon" href={`${basePath}/logo.png`} />
      </head>
      <body className="bg-dark-bg text-dark-text antialiased">
        {children}
      </body>
    </html>
  );
}
