//hi@stepbrobd.com

import TwitterTab from "./twitterTabs";

type Props = {
  tenQueriedList: any;
};

const TwitterTable = (props: Props) => {
  var tabCount = props.tenQueriedList.length;

  var tabList: any = [];
  props.tenQueriedList.map((query: any) =>
    tabList.push(
      <TwitterTab
        uid={query.id}
        stockName={query.stockName}
        tweet={query.Content}
        dateTime={query.Date}
        sentiment={query.Sent}
      />
    )
  );

  //Iterate and create x amount of tabs given stock info
  return (
    <>
      <div className="rounded-3xl bg-white pl-6 pr-6 pl-4 mt-8">
        <h1 className="mt-10 pt-8 text-center leading-4">Tweets</h1>
        <div className="mb-6 flex items-center justify-between rounded-full bg-yellow-400 pr-10 pl-10 font-semibold">
          <p>Stock</p>
          <p>Tweet</p>
          <p className="ml-20"></p>
          <p>Date-Time</p>
          <p>Sentiment</p>
        </div>

        {tabList}
      </div>
    </>
  );
};

export default TwitterTable;
