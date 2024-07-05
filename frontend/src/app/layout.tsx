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
      <body className={inter.className}>
        {children}

        <Blur position="top" color={theme.colors.blur.top} />
        <Blur position="bottom" color={theme.colors.blur.bottom} />
      </body>
    </html>
  );
}
