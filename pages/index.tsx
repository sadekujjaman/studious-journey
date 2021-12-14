import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
import { PageWrapper } from "./components/page-component/commons";
import Footer from "./components/page-component/footer";
import { Intro } from "./components/page-component/home";
import { Nav } from "./components/page-component/navbar";
import { WrapperPage } from "./components/page-component/page-wrapper";

const Home: NextPage = () => {
  const [session, loading] = useSession();
  return (
    <>
      <WrapperPage title="Project Manager">{() => <Intro />}</WrapperPage>
    </>
  );
};

export default Home;
