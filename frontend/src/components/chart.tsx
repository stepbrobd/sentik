// Adding in Content for components here
import { useState, useEffect } from "react";
// import {View, Text} from "react-nativ"
import Plot from "react-plotly.js";
import ChartInfo from "./chartInfo";
import { getAllTweets } from "./hooks/getAllTweetsQuery";
import { useQuery } from "@tanstack/react-query";

type Props = {
    stockName: string;
};
  
const ChartComponent = (props:Props) => {

    //TODO: handle multiple tickers passed
    const {data, isLoading} = useQuery(['allTweets'], getAllTweets(props.stockName));

    var postiveVotes = [1, 2, 4, 10]
    var negativeVotes = [1, 5, 6, 9]
    //Add in reset time here 
        // Fresh Update

    //

    var stockName = " Apple"
    var stockRating = 5
    var numTweets = "35"
    var chartData : any = []
//   var chartData: any = [
//     {
//       x: [1, 2, 3, 4],
//       y: postiveVotes,
//       fill: "tozeroy",
//       type: "scatter",
//       name: "+ Votes",
//     },
//     {
//       x: [1, 2, 3, 4],
//       y: negativeVotes,
//       fill: "tonexty",
//       type: "scatter",
//       name: "- Votes",
//     },
//   ];

  return (
    <>
    {isLoading ? (
        <p> ...Loading </p>
    ) : data ? (
        data.data.map((tweet) => {
            //Generate graph data from Tweets
        })
        <Plot
            data={chartData}
            layout={{ width: 320, height: 240, title: "Stock Name Here" }}
        />
    )

    <ChartInfo stockName={stockName} stockRating={stockRating} numTweets = {numTweets}/>
       </>
  );
};

export default ChartComponent;
