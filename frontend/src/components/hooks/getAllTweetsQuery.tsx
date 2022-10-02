import axios from "axios";

interface Tweet {
    Id: string,
    Ticker: string,
    Sent: string,
    Content: string,
    Date: string,
}

const allTweetsUrl = "localhost:8080/tickers/";

async function getAllTweets(ticker : string): Promise<Tweet[]> {
    const response = await axios.get(`${allTweetsUrl}${ticker}`);
    return response.data
}