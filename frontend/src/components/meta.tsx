import Head from "next/head";

type Props = {
  title: string;
  description: string;
  image: string;
  keywords: string;
  slug: string;
};

const Meta = (props: Props) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://yifei.md/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://yifei.md/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://yifei.md/favicon-16x16.png"
      />
      <link rel="shortcut icon" href="https://yifei.md/favicon.ico" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={"https://yifei.md" + props.slug} />
      <meta property="og:image" content={"https://yifei.md" + props.image} />
      <meta property="robots" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:image" content={"https://yifei.md" + props.image} />
      <meta name="twitter:site" content="@StepBroBD" />
      <meta name="twitter:creator" content="@StepBroBD" />
    </Head>
  );
};

export default Meta;
