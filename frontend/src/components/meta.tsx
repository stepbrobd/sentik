import Head from "next/head";
import logo from './../../public/logo.png';

type Props = {
  title: string;
  description: string;
  image: string;
  keywords: string;
  slug: string;
};

const Meta = (props: Props) => {
  render(){
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180">
       <image src={logo}/>
      </link>

      <link>
        rel="icon"
        type="image/png"
        sizes="32x32"
        <image src={logo}/>
       </link>

      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://twitic.stepbrobd.com/favicon-16x16.png"
      />

      <link
        rel="shortcut icon"
        href="https://twitic.stepbrobd.com/favicon.ico"
      />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:url"
        content={"https://twitic.stepbrobd.com" + props.slug}
      />
      <meta
        property="og:image"
        content={"https://twitic.stepbrobd.com" + props.image}
      />
      <meta property="robots" content="index, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:title" content={props.title} />
      <meta
        name="twitter:image"
        content={"https://twitic.stepbrobd.com" + props.image}
      />
      <meta name="twitter:site" content="@HackMIT" />
      <meta name="twitter:creator" content="@HackMIT" />
    </Head>
  );};
};

export default Meta;
