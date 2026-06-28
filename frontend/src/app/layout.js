import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import LayoutClient from "@/components/common/LayoutClient";

import { Toaster } from "sonner";

export const metadata = {
  title: "Web Auditor",
  description: "AI Powered Website Auditor",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <LayoutClient>
            {children}
          </LayoutClient>

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </QueryProvider>
      </body>
    </html>
  );
}