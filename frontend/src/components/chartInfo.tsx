import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
type Props = {
  stockName: string;
  stockRating: number;
  numTweets: string;
};

const ChartInfo = (props: Props) => {
  //Putting the Amount of stairs

  const list = [];
  for (var i = 0; i < props.stockRating; i++) {
    list.push(
      <li className="h-[24px] w-[24px]">
        <StarIcon />
      </li>
    );
  }

  return (
    <>
      <p>{props.stockName}</p>
      {/* The amount of stars through map */}
      <ul className="flex h-[24px] w-[24px] flex-row">{list}</ul>
      <p>Rating
        {props.stockRating}
        </p>

      <p>({props.numTweets} Tweets in the last 5 minutes)</p>
    </>
  );
};

//export default function ChartInfo({stockName}, {Rating}, Votes})
//{

//}

export default ChartInfo;
