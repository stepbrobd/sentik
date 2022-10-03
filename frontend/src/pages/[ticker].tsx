import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Meta from "../components/meta";
import Positive from "../components/positivesentiment";
import Negative from "../components/negativesentiment";
import dynamic from "next/dynamic";
const Chart: any = dynamic(import("../components/chart"), {
  ssr: false,
});

type Tickers = {
  [key: string]: Data[]
}

type Data = {
  Id: string;
  Ticker: string;
  Sent: string;
  Content: string;
  Date: string;
};

const Ticker = () => {
  const router = useRouter();
  const ticker = typeof(router.query.ticker) == "string" ? router.query.ticker.split(",") : undefined;

  const [data, setData] = useState<Tickers>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (ticker) {
      fetch(`http://localhost:8080/tickers/${ticker}`)
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        });
    }
  }, [router.query]);

  useEffect(() => {
  }, [ticker]);

  return (
    <>
      <Meta
        title="Sentik-Stocks - HackMIT 2022"
        description="Sentik-Stocks - a HackMIT 2022 project"
        image="/404.webp"
        keywords="HackMIT, HackMIT 2022, Sentik-Stocks, Twitter, Stocks"
        slug="/"
      />
      <div className="rounded-2xl bg-white pl-4 pr-6 pt-8 pb-8">
      { loading || !ticker ? <h2 className="text-center">Loading...</h2> :
        ticker.map((tick) => ( 
          <>
          <Chart key={tick} data={data[tick]} /> 
          <table className="min-w-full max-w-full divide-y divide-gray-300 rounded-full pr-10 pl-10">
            <thead className="bg-yellow-400">
              <tr className="divide-x divide-gray-200">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-black sm:pl-6"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Tweet
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                >
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data[tick].map((item) => (
                <tr key={item.Id} className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                    {tick}
                  </td>
                  <td className="whitespace-wrap p-4 text-sm text-gray-500">
                    {" "}
                    <span> &quot; </span>
                    {item.Content} <span> &quot; </span>
                  </td>
                  <td className="whitespace-wrap p-4 text-sm text-gray-500">
                    {item.Date}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                    {item.Sent === "positive" ? <Positive /> : <Negative />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        ))
      }
      </div>
    </>
  );
};

export default Ticker;
