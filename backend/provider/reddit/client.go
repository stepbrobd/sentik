package reddit

type RedditClient struct {
}

func MakeClient(cfg map[string]string) (RedditClient, error) {
	return RedditClient{}, nil
}
