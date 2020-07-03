const logger = require('./logger');
const { response } = require('express');

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');

	req.token = null;

	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		req.token = authorization.substring(7);
	}

	next();
};

const requestLogger = (req, res, next) => {
	logger.info('Method: ', req.method);
	logger.info('Path: ', req.path);
	logger.info('Body: ', req.body);
	logger.info('---------------------------');
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'token missing' });
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
};
