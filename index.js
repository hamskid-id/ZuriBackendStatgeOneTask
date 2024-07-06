const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getCallerIP } = require('./middleware/ip');
const app = express();
require("dotenv").config();
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getCallerIP);
app.get('/api/hello', async (req, res) => {
    const { visitor_name } = req.query;
    if (!visitor_name) {
        return res.status(400).json({
            message: "Visitor's Name is required"
        });
    }
    res.status(200).json({
        client_ip: req.clientIp,
        location: req.city,
        greeting: `Hello ${visitor_name}!, the temperature is ${req.temparature} in ${req.city}`
    });
});
app.get('/', async (req, res) => {
    res.send("Hello there! app is running great");
});
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on localhost:${port}...`));

