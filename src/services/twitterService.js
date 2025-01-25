const Twitter = require('twitter');
const config = require('../config');

const client = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET,
});

const twitterService = {
  sendTweet: (status) => {
    return client.post('statuses/update', { status });
  },

  likeTweet: (tweetId) => {
    return client.post('favorites/create', { id: tweetId });
  },

  retweet: (tweetId) => {
    return client.post(`statuses/retweet/${tweetId}`);
  },

  commentOnTweet: (tweetId, comment) => {
    const status = `@${tweetId.user.screen_name} ${comment}`;
    return client.post('statuses/update', { status, in_reply_to_status_id: tweetId.id_str });
  },
};

module.exports = twitterService;