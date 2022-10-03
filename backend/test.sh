#!/bin/bash
curl "https://api.twitter.com/2/tweets/search/recent?query=lang%3Aen%20AMD&max_results=100" -H "Authorization: Bearer $BEARER_TOKEN"
