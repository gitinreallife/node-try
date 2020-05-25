var express = require('express')
var bodyParser = require('body-parser')
const env = require('./app/config/env.js')
const cors = require('cors')

var app = express()

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

const db = require('./app/config/db.config.js')

//force: true will drop the table if it already exists
// db.ISequelize.sync({force:true}).then(()=>{
//     console.log('Drop and Resync with { force: true }')
// })

// require('./app/controller/_base.controller')(app)
require('./app/route/user.route.js')(app)
require('./app/route/bruh.route.js')(app)

var host = env.host
var port = env.port
// Create a server
var server = app.listen(port, function(){

    console.log(`App listening at http://${host}:${port}`)
})