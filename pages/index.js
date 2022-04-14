import { getProviders, getSession, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";

export default function Home({ providers }) {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <div className="bg-white dark:bg-zinc-800 h-screen">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-6 py-2 mt-10 bg-black dark:bg-white text-white dark:text-black"
        >
          toggle to {theme === "light" ? "dark" : "light"}
        </button>
        <div>This page gonna be my culture log</div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return { props: { session, providers } };
}
