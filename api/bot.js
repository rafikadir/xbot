const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

// Twitter API credentials from your developer account
const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const TARGET_ACCOUNT = 'i_am_rafikadir';  // Replace with the target username

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch the user ID of the target account
    const user = await client.v2.userByUsername(TARGET_ACCOUNT);
    const userId = user.data.id;

    // Get the most recent tweet from the target account
    const tweets = await client.v2.userTimeline(userId, { max_results: 1 }); // Fetch only the latest tweet

    if (tweets.data && tweets.data.length > 0) {
      const tweetId = tweets.data[0].id;

      // Like the tweet
      await client.v2.like(process.env.TWITTER_USER_ID, tweetId);
      console.log(`Liked tweet ID: ${tweetId}`);

      // Retweet the tweet
      await client.v2.retweet(process.env.TWITTER_USER_ID, tweetId);
      console.log(`Retweeted tweet ID: ${tweetId}`);

      // Comment on the tweet
      await client.v2.reply(COMMENT_TEXT, tweetId);
      console.log(`Commented on tweet ID: ${tweetId}`);

      return res.status(200).json({ message: 'Action completed successfully' });
    } else {
      return res.status(404).json({ error: 'No tweets found for the target account.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};