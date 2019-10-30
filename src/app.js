const path = require('path');
const experss = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = experss();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
 app.set('view engine', 'hbs');
 app.set('views', viewsPath);
 hbs.registerPartials(partialsPath);

 // Setup static directory to serve
 app.use(experss.static(publicDirectoryPath))
 
 app.get('', (req, res) => {
    res.render('index', {
        // title: 'Weather App',
        name: 'Ashu',
        heading: 'Home page',
        footerText: 'Ashish Sharma'
    })
 })
 app.get('/about', (req, res) => {
    res.render('about', {
        heading: 'About page',
        footerText: 'Ashish'
    })
 })
 app.get('/help', (req, res) => {
        res.render('help', {
            heading: 'Help Page',
            // title: 'Help Page',
            footerText: 'Ashu'
        })
 })
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude,longitude, (error, forecastData) => {
          if(error) {
            return res.send({ error });
          }
         res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
         
       })
       })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        heading: '404 Page',
        errorText: 'help page not found',
        footerText: 'A.K.S'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        heading: '404 Page',
        errorText: 'Page not found',
        footerText: 'A.K.S'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})