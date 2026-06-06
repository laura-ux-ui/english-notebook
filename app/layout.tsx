import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Notebook · Laura",
  description: "Cuadernillo de inglés por capítulos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
