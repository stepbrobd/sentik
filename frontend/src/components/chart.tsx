import Plot from "react-plotly.js";

type Data = {
  Id: string;
  Ticker: string;
  Sent: string;
  Content: string;
  Date: string;
};

type Props = {
  data: Data[];
};

const ChartComponent = (props: Props) => {
  var pVotes: number = 0;
  var nVotes: number = 0;
  var positiveVotesArr: number[] = [];
  var negativeVotesArr: number[] = [];
  var totalVotes: number;

  var rating: number = 5;

  var elapsedTimes: number[] = [];
  for (i = 0; i < props.data.length; i++) {
    elapsedTimes.push(i);
  }

  //gain positive & negative votes
  for (var i = 0; i < props.data.length; i++) {
    console.log(props.data[i]);

    if (props.data[i].Sent === "positive") {
      pVotes++;
    } else if (props.data[i].Sent === "negative") {
      nVotes++;
    }
    positiveVotesArr.push(pVotes);
    negativeVotesArr.push(nVotes);
  }
  var chartData: any = [
    {
      x: elapsedTimes,
      y: negativeVotesArr,
      type: "scatter",
      name: "-",
    },
    {
      x: elapsedTimes,
      y: positiveVotesArr,
      type: "scatter",
      name: "+",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-2 pt-6 pb-8">
      <Plot
        className="place-content-center leading-4"
        data={chartData}
        layout={{ width: 520, height: 340, title: props.data[0].Ticker }}
      />

      <p className="text-center leading-4 text-gray-400">
        ({props.data.length} tweets in the last 5 minutes)
      </p>
    </div>
  );
};

export default ChartComponent;
