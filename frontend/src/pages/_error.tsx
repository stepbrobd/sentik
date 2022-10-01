import type { NextPageContext } from "next";
import MDXImage from "../components/mdx-image";
import Meta from "../components/meta";

type Props = {
  statusCode?: number;
};

const Error = ({ statusCode }: Props) => {
  return (
    <>
      <Meta
        title="{statusCode} Internal Server Error - Yifei Sun"
        description="The page you are looking for caused an error on the server."
        image="/500.webp"
        keywords="500, 50x, internal server error, error"
        slug="/{statusCode}"
      />

      <h1>{statusCode} Internal Server Error</h1>

      <MDXImage
        src="/500.webp"
        alt='DALL·E: "HTTP 500 Internal Server Error, depicted as a cute, happy kitten tearing down wires in a computer, digital art."'
      />
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
