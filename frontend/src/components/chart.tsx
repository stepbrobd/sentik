// Adding in Content for components here
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import ChartInfo from "./chartInfo";
const ChartComponent = () => {

    var postiveVotes = [1, 2, 4, 10]
    var negativeVotes = [1, 5, 6, 9]
    //Add in reset time here 
        // Fresh Update

    //

    var stockName = " Apple"
    var stockRating = 5
    var numTweets = "35"

  var data: any = [
    {
      x: [1, 2, 3, 4],
      y: postiveVotes,
      fill: "tozeroy",
      type: "scatter",
      name: "+ Votes",
    },
    {
      x: [1, 2, 3, 4],
      y: negativeVotes,
      fill: "tonexty",
      type: "scatter",
      name: "- Votes",
    },
  ];

  return (
    <>
    <Plot
      data={data}
      layout={{ width: 320, height: 240, title: "Stock Name Here" }}
    />
    <ChartInfo stockName={stockName} stockRating={stockRating} numTweets = {numTweets}/>
       </>
  );
};

export default ChartComponent;
