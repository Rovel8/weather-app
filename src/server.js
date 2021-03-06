const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { weatherInTheCity } = require('./utils/weatherInTheCity')

const app = express();

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Pavel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello from help page',
        name: 'Pavel'
    })
})

app.get('/weather', async (req, res) => {
    if(!req.query.city){
        return res.send({
            error: 'You must provide a city name'
        })
    }
    const result = await weatherInTheCity(req.query.city)
    if(result.error){
        return res.send({
            error: result.error
        })
    }
    res.send({
        result
    })
    
    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        message: 'Help article not found',
        name: 'Pavel'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Pavel',
        message: 'Page not found'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})