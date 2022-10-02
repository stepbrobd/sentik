import Hero from "../components/hero";
import Meta from "../components/meta";
import dynamic from "next/dynamic";
import TwitterTable from "../components/twitterTable";
const Chart: any = dynamic(import("../components/chart"), {
  ssr: false,
});

var stockName = "example stock"
var stockRating = 1
var numTweets = 1
var tweet = "sample tweet text here"
var dateTime = "1222-14-2002"
var sentiment = true
const Index = () => {

          {/* Get the info once pass through
      
      receiving:
      List of:
      {  
      ID "12412412512",
        Ticker "TSLA",
        Sent: TRUE
        Content "The quick brown fox jumped over the lazy dog"
        Date: "TIME GOES HERE"
      },
      
      */}

    //take in info


    //Do get request query
    var QueryList = [];
    for(var i = 0; i < 15; i++)
    {
        QueryList.push({Id: 1, Ticker: "TSLA", Sent: true, Content: "The Content should go here", Date: "0000-12-00"})
    }
    

    //get first 10 from QueryList - Make infinite Scroll
    var tenQueriedList = [];
    for(var i = 0; i < 10; i++)
    {
        tenQueriedList.push(QueryList[i])
    }

    //var stockName : string
    var stockName = QueryList[0].Ticker
    
    //numberTweets
    var numTweets = QueryList.length

    //calculate Stock Rating
     //var stockRating = 
    
    //var tenQueriedList = 
  return (
    <>
      <Meta
        title="TwiTick - HackMIT 2022"
        description="TwiTick - a HackMIT 2022 project"
        image="/404.webp"
        keywords="HackMIT, HackMIT 2022, TwiTick, Twitter, Stocks"
        slug="/"
      />

      <h1>Sample Plots below</h1>

      <Chart stockName={stockName} stockRating={stockRating} numTweets = {numTweets} />
      {/*     <ChartInfo stockName={stockName} stockRating={stockRating} numTweets = {numTweets}/> */}
      {/* 
    type Props = {
    stockName: string;
    Tweet: string;
    dateTime: string;
    sentiment: boolean;
    numTweets: string;
  };
  */}


      <TwitterTable tenQueriedList={tenQueriedList} />
      <Hero />
    </>
  );
};

export default Index;
