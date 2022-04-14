import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";

export default function Home({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      <Header />

      <div>
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
