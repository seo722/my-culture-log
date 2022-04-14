import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <Header />

        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
