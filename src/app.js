const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode=require('./utils/geocode')



const app = express()

const port=process.env.PORT||3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))



// Render handlebar templates
// ref https://expressjs.com/en/4x/api.html#app
app.get('', (req, res) => {
    res.render('index',
        {
            title: 'Weather',
            name: 'Sameera Dissanayaka'
        })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sameera Dissanayaka'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: 'Help',
        name: 'Sameera Dissanayaka'
    })
})
app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({error:'Please provide an address!'})
    }

    geocode(req.query.address,(error,forcastData)=>{
if(error){
    return res.send({error})
}
res.send({
  forcast:forcastData,
  
})
    })
    // res.send({
    //     location:req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Sameera Dissanayaka',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sameera Dissanayaka',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Web server is running and listening port '+port)
})