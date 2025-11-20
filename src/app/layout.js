import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "Do Meu Jeito",
  description: "Do meu jeito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt_br">
      <body className={openSans.className}>
        <ThemeProvider attribute="class" defaultTheme="ligth" enableSystem suppressHydrationWarning>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
