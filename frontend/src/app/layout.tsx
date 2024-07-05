import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Blur from "./components/shared/Blur";
import theme from "./core/utils/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P1 Energy Dashboard",
  description: "A self-hosted energy dashboard of Smart P1 Meters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>"></link>
      </head>
      <body className={inter.className}>
        {children}

        <Blur position="top" color={theme.colors.blur.top} />
        <Blur position="bottom" color={theme.colors.blur.bottom} />
      </body>
    </html>
  );
}
