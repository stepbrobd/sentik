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
  return <>{tabList}</>;
};

export default TwitterTable;
