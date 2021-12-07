import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { ThreeJSContext } from "../contexts/ThreeJSContext";
import { Container, Content } from "../styles";

const Home: NextPage = () => {
  const { meta } = useContext(ThreeJSContext);

  return (
    <Container>
      <Head>
        <title>R2U Meta</title>
      </Head>

      <Content>
        <div>
          <span>Hello world!</span>
          <span>You are accessing {meta?.website}</span>
        </div>
      </Content>
    </Container>
  );
};

export default Home;
