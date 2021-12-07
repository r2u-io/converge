import type { AppProps } from "next/app";
import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ThreeJSProvider } from "../contexts/ThreeJSContext";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    overflow: hidden;

    color: white;
    background-color: #131524;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <ThreeJSProvider>
        <Component {...pageProps} />
      </ThreeJSProvider>
    </ThemeProvider>
  );
}
export default MyApp;
