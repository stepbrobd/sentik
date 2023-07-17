import "../styles/tailwind.css";

import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
};

export default App;
