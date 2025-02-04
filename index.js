require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/exchange-rate', async (req, res) => {
    const currency = req.query.currency;
    if (!currency || !currency.length) {
        res.status(400).send("Bad Request: Currency not specified");
        return;
    }

    const dateA = (req.query.dateA ? new Date(req.query.dateA) : new Date(0));
    const dateB = (req.query.dateB ? new Date(req.query.dateB) : new Date(Date.now()));
    try{
        const data = await db.getData(currency, dateA, dateB);
        if (!data.length) {
            res.status(404).send("Error: Resource Not Found");
            return;
        }
        const chartData = JSON.stringify(processData(data));
        res.render('exchange-rate', {data: chartData});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
    
    function processData(data) {
        newData = [['Date', `${currency}`]];
        for(i in data) {
            const item = data[i];
            const date = new Date(item['Date']);
            newData.push([date.getUTCMonth() + 1 + '.' + date.getUTCFullYear(), item[`${currency}`]]);
        }
        return newData;
    }
});

app.get('/summary', async (req, res) => {
    const currency = req.query.currency;
    if (!currency || !currency.length) {
        res.status(400).send("Bad Request: Currency not specified");
        return;
    }

    const dateA = (req.query.dateA ? new Date(req.query.dateA) : new Date(0));
    const dateB = (req.query.dateB ? new Date(req.query.dateB) : new Date(Date.now()));
    try {
        const data = await db.getData(currency, dateA, dateB);

        if (!data.length) {
            res.status(404).send("Error: Resource Not Found");
            return;
        }

        const processedData = processData(data);
        res.render('summary', {data: processedData})
    } catch(error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
    function processData(data) {
        const newData = [];
        const result = {};
        sum = 0;
        for(i in data) {
            const item = data[i];
            newData.push(item[`${currency}`]);
            sum += item[`${currency}`];
            if (!result.min || result.min > item[`${currency}`])
                result.min = item[`${currency}`];
            if (!result.max || result.max < item[`${currency}`])
                result.max = item[`${currency}`];
        }
        result.avg = sum / newData.length;
        result.stdDev = stdDev(newData, result.avg);

        return result;
    }
    function stdDev(data, avg) {
        result = 0;
        for(i in data) {
            result += Math.pow(data[i] - avg, 2);
        }
        result /= data.length;
        result = Math.sqrt(result);
        return result;
    }
});

app.listen(process.env.PORT, console.log(`http://localhost:${process.env.PORT}`));