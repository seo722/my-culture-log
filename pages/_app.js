import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import "../styles/globals.css";

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <SessionProvider session={session}>
            <Header />

            <Component {...pageProps} />
          </SessionProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
