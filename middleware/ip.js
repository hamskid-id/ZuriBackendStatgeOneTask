require("dotenv").config();
const requestIp = require('request-ip');
const axios = require('axios');
const APIKEY = process.env.APIKEY;
const WEATHERAPIKEY = process.env.WEATHERAPIKEY;
const getCallerIP = async (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    try{
        const response = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${APIKEY}&ip_address=${clientIp}`)
        const weatherURL = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${response.data.city}&units=metric&APPID=${WEATHERAPIKEY}`);
        req.city = response.data.city;
        req.clientIp = response.data.ip_address;
        req.temparature = weatherURL.data.main.temp
        console.log(weatherURL);
        next()
    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports = { getCallerIP };
