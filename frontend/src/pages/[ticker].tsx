import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Hero from "../components/hero";
import Meta from "../components/meta";

type Data = {
  Id: string;
  Ticker: string;
  Sent: string;
  Content: string;
  Date: string;
};

const Ticker = () => {
  const router = useRouter();
  const { ticker } = router.query;

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (ticker) {
      fetch(`http://localhost:8080/tickers/${ticker}`)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    }
  }, [ticker]);

  return (
    <>
      <Meta
        title="Sentik - HackMIT 2022"
        description="Sentik - a HackMIT 2022 project"
        image="/404.webp"
        keywords="HackMIT, HackMIT 2022, Sentik, Twitter, Stocks"
        slug="/"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <div key={item.Id}>
            <p>{item.Ticker}</p>
            <p>{item.Sent}</p>
            <p>{item.Content}</p>
            <p>{item.Date}</p>
          </div>
        ))
      )}
    </>
  );
};

// const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const params = context.params as Params;
//   const r = await fetch(`http://localhost:8080/tickers/${params.ticker}`);
//   const res: Res = await r.json();
//   const data: Data[] = res.data;
//
//   return {
//     props: { data },
//   };
// };

export default Ticker;
