// pages/api/bot.js
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const TARGET_ACCOUNT = 'i_am_rafikadir'; // Replace with the targeted username
const COMMENT_TEXT = 'Awesome tweet! 🚀';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Fetch the user ID of the target account
      const user = await client.v2.userByUsername(TARGET_ACCOUNT);
      const userId = user.data.id;

      // Get the latest tweet from the target account
      const tweet = await client.v2.userTimeline(userId, { max_results: 1 });
      const latestTweet = tweet.data[0];

      // Like, retweet, and comment on the tweet
      await client.v2.like(process.env.USER_ID, latestTweet.id);
      await client.v2.retweet(process.env.USER_ID, latestTweet.id);
      await client.v2.reply(COMMENT_TEXT, latestTweet.id);

      // Send a JSON response with success
      res.status(200).json({ message: 'Successfully interacted with the tweet!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to interact with the tweet.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
