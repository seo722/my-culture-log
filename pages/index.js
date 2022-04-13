import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";

export default function Home({ providers }) {
  const { data: session } = useSession();
  console.log(session);

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <div>This page gonna be my culture log</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return { props: { session, providers } };
}
