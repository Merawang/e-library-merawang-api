const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// setup port
dotenv.config({ path: ".env" })
const PORT = process.env.PORT || 8000

// DB configuration
const connectDB = require('./src/database/connection');

// API endpoints
const booksRoute = require('./src/routes/booksRoute');
const borrowsRoute = require('./src/routes/borrowsRoute')
const authRoute = require('./src/routes/authRoute')

// Error handler middleware
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

//mongoDB connection
connectDB();

//Third party middlewares
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(morgan('dev')); // logger
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   next();
// });

// Use route
app.use('/api/books', booksRoute);
app.use('/api/borrows', borrowsRoute);
app.use('/api/auth', authRoute);

// Middleware error handler
app.use(errorHandler);

// Index endpoints
app.get('/', (req, res) => {
  res.status(200).json({ message: "E-Library API (Merawang Dev Team)" })
})



// Listen port
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });