const express = require('express');
const controller = require('../controllers/booksController');
const auth = require('../middlewares/auth');

const route = express.Router();

// Route for contacts controller
route.get('/search', controller.searchGoogleBooks);
route.get('/:id', controller.getBook);
route.get('/', controller.getAllBooks);

route.post('/', auth.authenticate, controller.createBook);
route.patch('/:id', auth.authenticate, controller.updateBook);
route.delete('/:id', auth.authenticate, controller.deleteBook);

// Route error handler
route.patch('/', (req, res, next) => {
    try {
        throw new Error("PUT '/' route is not found")
    } catch (e) {
        e.statusCode = 404;
        next(e)
    }
});

route.delete('/', (req, res, next) => {
    try {
        throw new Error("DELETE '/' route is not found")
    } catch (e) {
        e.statusCode = 404;
        next(e)
    }
});

module.exports = route