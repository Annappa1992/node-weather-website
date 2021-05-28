const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;

//Define paths for exprress config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Shree Krishna"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        src: "/img/me.jpg",
        name: "Shree Krishna"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text.",
        title: "Help",
        name: "Shree Krishna"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide the valid address!"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ 
                forecast: foreCastData, 
                location, 
                address: req.query.address 
            });
        });

    });

    // res.send({ forecast: "It is Sunny", location: "Bengaluru", address: req.query.address });
});
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide the search term!"
        });
    }
    res.send({
        products: []
    });

});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Shree Krishna",
        errorMessage: "Help Article Not Found."
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        nam: "Shree Krishna",
        errorMessage: "Page Not Found."
    });
});

//start server
app.listen(port, () => {
    console.log("Server is up on Port " + port);
});