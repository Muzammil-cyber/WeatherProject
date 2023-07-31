const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    // console.log(req.body);
    let appId = "a786c740192c5d9c2cab10255c49ef33";
    let city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appId + "&q=" + city + "&units=metric";
    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {
            let weatherData = JSON.parse(data);
            let temperature = weatherData.main.temp;
            let description = weatherData.weather[0].description;
            let icon = weatherData.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Temperature in " + city + ": " + temperature + " degree C</h1>");
            res.write("<h3>Description: " + description + "</h3>");
            res.write("<img src= " + iconURL + ">");
            res.send();

        })
    })

})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})