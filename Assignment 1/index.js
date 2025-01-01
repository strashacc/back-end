const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/calculate-bmi', (req, res) => {
    let weight = req.body['Weight'];
    let height = req.body['Height'] / 100;
    let bmi = (weight / (height * height)).toFixed(1);
    res.render('result', {bmi: bmi});
});

app.listen(PORT, console.log('Server is listening on http://localhost:' + PORT));