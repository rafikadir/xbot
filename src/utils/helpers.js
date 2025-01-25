module.exports = {
    formatTweet: (tweet) => {
        return tweet.trim().replace(/\s+/g, ' ');
    },
    handleError: (error) => {
        console.error('An error occurred:', error.message);
    },
    isValidTweet: (tweet) => {
        return typeof tweet === 'string' && tweet.length > 0 && tweet.length <= 280;
    }
};