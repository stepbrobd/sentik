import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../utils/config";
import Meta from "../components/meta";
import Positive from "../components/positive-sentiment";
import Negative from "../components/negative-sentiment";
import dynamic from "next/dynamic";
const Chart: any = dynamic(import("../components/chart"), {
  ssr: false,
});

type Tickers = {
  [key: string]: Data[];
};

type Data = {
  id: string;
  ticker: string;
  sentiment: string;
  content: string;
  date: string;
};

const Ticker = () => {
  const router = useRouter();
  const ticker =
    typeof router.query.ticker == "string"
      ? router.query.ticker.split(",")
      : undefined;

  const [data, setData] = useState<Tickers>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (ticker) {
      fetch(`${ENDPOINT}/v1/tickers/${ticker}`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        });
    }
  }, [router.query]);

  useEffect(() => {}, [ticker]);

  return (
    <>
      <Meta
        title="Sentik"
        description="Sentik - a HackMIT 2022 project"
        image="/logo.png"
        keywords="HackMIT, HackMIT 2022, Sentik, Twitter, Stocks"
        slug={router.basePath}
      />
      <div className="overflow-auto rounded-2xl bg-white pl-4 pr-6 pt-8 pb-8">
        {loading || !ticker ? (
          <h2 className="text-center">Loading...</h2>
        ) : (
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
                    <tr key={item.id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {tick}
                      </td>
                      <td className="whitespace-wrap p-4 text-sm text-gray-500">
                        {" "}
                        <span> &quot; </span>
                        {item.content} <span> &quot; </span>
                      </td>
                      <td className="whitespace-wrap p-4 text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                        {item.sentiment === "positive" ? (
                          <Positive />
                        ) : (
                          <Negative />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Ticker;
