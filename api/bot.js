const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
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

    // Get the latest tweet from the target account
    const tweet = await client.v2.userTimeline(userId, { max_results: 1 });

    if (tweet.data && tweet.data.length > 0) {
      const latestTweet = tweet.data[0];

      // Like the tweet (this is how you "bookmark" a tweet for now)
      await client.v2.like(process.env.USER_ID, latestTweet.id);
      console.log(`Bookmarked tweet: ${latestTweet.id}`);

      res.status(200).json({ message: 'Successfully bookmarked the tweet!' });
    } else {
      res.status(404).json({ error: 'No tweets found.' });
    }
  } catch (error) {
    console.error('Error running bot:', error);
    res.status(500).json({ error: 'Failed to bookmark tweet.' });
  }
};
