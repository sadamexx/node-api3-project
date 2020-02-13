const express = require('express');
const userRouter = require('./users/userRouter');


const server = express();
server.use(express.json());


server.use('/api/users', logger, userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//global middleware

function logger(req, res, next) {
  console.log(`${req.method} request made to ${req.originalUrl} on 
  [${new Date().toISOString()}]`);
  next();
}


module.exports = server;
