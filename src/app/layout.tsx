import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";

import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Issue Tracker",
  description: "Track issues with MyVoice.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <div>
            <div className="mb-4 flex items-center border-b-2 border-slate-100">
              <Link href="/">
                <div className="flex cursor-pointer items-center gap-2 py-3">
                  <Image
                    className="ml-6"
                    src="/mv_logo_dark.png"
                    alt="MyVoice Logo"
                    width={40}
                    height={40}
                  />
                  <p className="text-lg font-medium">MyVoice Issue Tracker</p>
                </div>
              </Link>
            </div>
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
