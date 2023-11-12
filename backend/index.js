const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const questionsRoutes = require('./routes/questions-routes');
const HttpError = require('./models/http-error');

const app = express();

//bodyParser is a middleware that parses the body of the request
app.use(bodyParser.json());

//handle CORS errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any domain to send requests (you can set this to specific domains)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow these headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow these methods
  next();
});

// basic hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
});


//routes
app.use('/api/users', usersRoutes);
app.use('/api/questions', questionsRoutes);








//in case of error
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }   
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});


//connect databse, then start, else throw error
mongoose
  .connect('mongodb+srv://akshatchavan2022:FiCI9Axb1tFk04b3@cluster0.ya35cje.mongodb.net/thinkthrough?retryWrites=true&w=majority')
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
