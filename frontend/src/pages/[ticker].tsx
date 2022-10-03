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
      fetch(`https://com-stepbrobd-hackmit.fly.dev/tickers/${ticker}`)
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
        keywords="HackMIT, HackMIT 2022, Sentik, Twitter, Stocks"
        slug={"/"+router.basePath}
      />

      <div className="min-w-fit flex-1 rounded-3xl bg-white pl-4 pr-6 pt-8 pb-8 mt-10">
      { loading || !ticker ? <h2 className="text-center">Loading...</h2> :
        ticker.map((tick) => (
          <>
          <Chart key={tick} data={data[tick]}
          layout={{ width: 500, height: 500 }}
          />




          <h1 className="mt-10 pt-8 text-center text-bold leading-6">Tweets</h1>

          <table className="flex-1 min-w-fit max-w-full divide-y divide-gray-300 rounded-full pr-10 pl-10 mt-2">
            <thead className="bg-yellow-400 min-w-fit ">
              <tr className="divide-x divide-gray-200 min-w-fit ">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm min-w-fit  font-semibold text-black sm:pl-6"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm min-w-fit font-semibold text-gray-900"
                >
                  Tweet
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left min-w-fit text-sm font-semibold text-gray-900"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left min-w-fit text-sm font-semibold text-gray-900 sm:pr-6"
                >
                  Sentiment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data[tick].map((item) => (
                <tr key={item.Id} className="divide-x divide-gray-200 min-w-fit ">
                  <td className=" min-w-fit whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                    {tick}
                  </td>
                  <td className=" min-w-fit whitespace-wrap p-4 text-sm text-gray-500">
                    {" "}
                    <span min-w-fit > &quot; </span>
                    {item.Content} <span> &quot; </span>
                  </td>
                  <td className="whitespace-wrap min-w-fit  p-4 text-sm text-gray-500">
                    {item.Date}
                  </td>
                  <td className="whitespace-nowrap min-w-fit  py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
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
