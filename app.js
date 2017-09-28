/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
var app = express()
var port = 3000

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
//middleware
app.use(express.logger('dev'))//The first piece of middleware we apply is the Express logger in 'dev' mode. This will simply log incoming requests to the console. 
app.use(stylus.middleware(//ext, the Stylus middleware is applied, which will compile our .styl files to CSS. 
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))//After that it's the Express static middleware, which is used for serving static files (we tell it that our static files will live in a folder called 'public'


//express routes
app.get('/', function (req, res) {
	console.log("Requesting")
	res.send('Hello World')
	console.log("Request Received")

  
})
app.listen(port)
console.log("Server Started on: " + port)