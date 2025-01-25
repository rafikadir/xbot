const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const TARGET_ACCOUNT = 'i_am_rafikadir';
const COMMENT_TEXT = 'Awesome tweet! 🚀';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    const user = await client.v2.userByUsername(TARGET_ACCOUNT);
    const userId = user.data.id;

    const tweets = await client.v2.userTimeline(userId, { max_results: 1 });
    const latestTweet = tweets.data[0];

    if (latestTweet) {
      await client.v2.like('your_twitter_user_id', latestTweet.id);
      await client.v2.retweet('your_twitter_user_id', latestTweet.id);
      await client.v2.reply(COMMENT_TEXT, latestTweet.id);

      return res.status(200).json({ message: `Interacted with tweet: ${latestTweet.id}` });
    } else {
      return res.status(200).json({ message: 'No tweets found!' });
    }
  } catch (error) {
    console.error('Error running bot:', error);
    return res.status(500).json({ error: 'Failed to run bot' });
  }
}
