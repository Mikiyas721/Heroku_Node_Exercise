/* Use npm package request to make an api call
*Steps to Express:
*1. Import the library using require('express');
*2.Make a call to the method express() and assign it to a variable
*3.use the variable above to handle the get HTTP request by passing in the route and a call back method
*This call back method is called with request and response
*use response.send
*
* A better alternative is to make a directory of all the files that we want to show using app.use(express.static());
*This means the use of a static Url
* Here the use method is a way of registering a middleware
*
* */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

app.set('views engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((request, response, next) => {
    let date = new Date().toString();
    let log = `${date} ${request.url} ${request.method}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        console.log(error)
    });
    next();
});
/*app.use((request, response, next) => {
    response.render('maintain.hbs', {
        error: "We are facing some challenges. We'll be back in a few seconds."
    });
    next();
});*/

app.get('/', (request, response) => {
    /* response.send("<h1>Hello Express</h1>");*/
    response.render('home.hbs', {
        title: 'Home Page',
        welcome: 'Welcome to our page dear customer'
    })
});


app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About Page',
    });
});
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: '404 Not found',
        cause: 'Server Not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});



















