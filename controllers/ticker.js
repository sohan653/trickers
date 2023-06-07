const axios = require('axios');
const Ticker = require("../models/ticker");

exports.fetchAndStoreData=async ()=> {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;


        const tickerData = Object.values(tickers).slice(0, 10).map(ticker => ({
            name: ticker.name,
            last: parseFloat(ticker.last),
            buy: parseFloat(ticker.buy),
            sell: parseFloat(ticker.sell),
            volume: parseFloat(ticker.volume),
            base_unit: ticker.base_unit,
        }));

        await Ticker.deleteMany({}); // Clear existing data

        await Ticker.insertMany(tickerData);

        console.log('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching and storing data:', error);
    }
}

exports.getTickers=async (req,res)=>{
    try {
        const tickers = await Ticker.find().limit(10);
        res.render('ticker', { tickers });

    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
}

