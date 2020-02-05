const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define paths

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partials)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    link: 'Nate'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    link: 'Nate'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: "Helping tezt",
    link: 'Nate'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term.'
    })
  } 

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error })
    }

    forecast(data.longitude, data.latitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location: data.location,
        forecast: forecastdata,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
if (!req.query.search) {
  return res.send({
    error: 'Provide a search term.'
  })
}
  console.log(req.query.search);
  res.send({
    
     products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Help',
    link: 'tae',
    errorMessage: 'Help page not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    link: 'Nae',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on ' + port + '!');
})