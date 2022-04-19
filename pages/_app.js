import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import "../styles/globals.css";

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={client}>
        <SessionProvider session={session}>
          <Header />

          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
