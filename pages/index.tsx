import type { NextPage } from "next";
import Head from "next/head";
import { Container, Content } from "../styles";

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>R2U Meta</title>
      </Head>

      <Content>
        <span>Hello World!</span>
      </Content>
    </Container>
  );
};

export default Home;
