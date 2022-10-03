#!/bin/bash
BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAAOrVhgEAAAAAm%2B6dfFRhj1%2FtTcRybbXzFjj5JEw%3DdGJP0MMmiKFN0atvJmXGZwIKQXglSdXc7epSuYdbm0CMZeeyIv
curl "https://api.twitter.com/2/tweets/search/recent?query=lang%3Aen%20AMD&max_results=100" -H "Authorization: Bearer $BEARER_TOKEN"
