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
  <div className="bg-white rounded-3xl pl-6 pr-6 pl-10" >
  <h1 className="text-center pt-8 leading-4 mt-40">Tweets</h1>
  <div className="font-semibold rounded-full bg-yellow-400  mb-6 pr-10 pl-10 flex items-center justify-between">
    <p></p>
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
