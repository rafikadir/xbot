const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

// Twitter API credentials from your developer account
const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const TARGET_ACCOUNT = 'i_am_rafikadir';
const COMMENT_TEXT = 'Awesome tweet! 🚀';

// Function to run the bot and interact with the latest tweet
const startBot = async () => {
  try {
    // Fetch the user ID of the target account
    const user = await client.v2.userByUsername(TARGET_ACCOUNT);
    const userId = user.data.id;

    // Get the most recent tweet from the target account
    const tweets = await client.v2.userTimeline(userId, { max_results: 1 }); // Fetch only the latest tweet

    if (tweets.data && tweets.data.length > 0) {
      const tweet = tweets.data[0]; // Get the latest tweet

      // Like the tweet
      await client.v2.like(userId, tweet.id);
      console.log(`Liked tweet: ${tweet.id}`);

      // Retweet the tweet
      await client.v2.retweet(userId, tweet.id);
      console.log(`Retweeted tweet: ${tweet.id}`);

      // Comment on the tweet
      await client.v2.reply(COMMENT_TEXT, tweet.id);
      console.log(`Commented on tweet: ${tweet.id}`);
    } else {
      console.log('No tweets found for this account.');
    }
  } catch (error) {
    console.error('Error running bot:', error);
  }
};

startBot();
