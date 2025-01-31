const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_CONNECTION_URI);

async function getData(currency, dateA, dateB) {
    // console.log(`${dateA}, ${dateB}`)
    try {
        await client.connect()

        const db = client.db(process.env.DB);
        const collection = db.collection(process.env.COLLECTION);

        const query = {Date: {$gte: dateA, $lte: dateB}};
        query[`${currency}`] = {$exists: true};
        const projection = {_id: 0, Date: 1};
        projection[`${currency}`] = 1;

        const data = await collection.find(query, {projection: projection, sort: {'Date': 1}}).toArray();

        return data;

    } catch (error) {
        console.error(error);
    }
}

module.exports = {getData};