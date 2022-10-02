// Adding in Content for components here
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import ChartInfo from "./chartInfo";
import { StarIcon } from"@heroicons/react/24/solid";

type Props = {
    stockName: string;
    stockRating: number;
    numTweets: string;
  };

const ChartComponent = (props:Props) => {

    var postiveVotes = [1, 2, 4, 10]
    var negativeVotes = [1, 5, 6, 9]
    //Add in reset time here
        // Fresh Update

    //

    var stockName = " Apple"
    var stockRating = 4
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

  var list = [];
  for (var i = 0; i < stockRating; i++) {
    list.push(
      <li className="h-[24px] w-[24px]">
        <StarIcon />
      </li>
    );
  }

  return (
    <>
    <div>
    <Plot className="leading-4 place-content-center"
      data={data}
      layout={{ width: 320, height: 240, title: "Stock Name Here" }}
    />

      <p className="text-center leading-4">{props.stockName}</p>
      {/* The amount of stars through map */}

      <p className=" leading-4 text-center">Rating {stockRating}
      <ul className=" leading-4 list-none flex h-[24px] w-[24px] flex-row">{list}</ul> </p>

      <p className="leading-4 text-center text-gray-400">({props.numTweets} tweets in the last 5 minutes)</p>
      </div>
    </>
  );
};

export default ChartComponent;
