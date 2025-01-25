const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const TARGET_ACCOUNT = 'i_am_rafikadir';
const COMMENT_TEXT = 'Awesome tweet! 🚀';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const user = await client.v2.userByUsername(TARGET_ACCOUNT);
    const tweets = await client.v2.userTimeline(user.data.id, { max_results: 1 });

    for (const tweet of tweets.data) {
      await client.v2.like(process.env.USER_ID, tweet.id);
      await client.v2.retweet(process.env.USER_ID, tweet.id);
      await client.v2.reply(COMMENT_TEXT, tweet.id);
    }

    res.status(200).json({ message: 'Bot ran successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to run bot' });
  }
};
