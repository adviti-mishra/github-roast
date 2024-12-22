import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Github Roasts",
  description: "Roast your Github repos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
