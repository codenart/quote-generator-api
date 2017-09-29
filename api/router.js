/* global __dirname */

'use strict';

const RequestURLException = require(__dirname + '/RequestURLException');

const express = require('express');
const router = express.Router();

/**
 * Quote Deliver
 */
router.get('/api/quote/\*', require(__dirname + '/quote/app'));

/**
 * Invalid Request URL
 * @param request
 * @param response
 */
router.get('*', (request, response) => {
   const format = '/api/type|object/action[?param1=value1][&param2=value2][&param3...';
   const samples = [
                      '/api/quote/random',
                      '/api/quote/get?author=*',
                      '/api/quote/get?author=Lao%20Tzu'
                   ];
   const exception = new RequestURLException(format, samples);
   response.json(exception);
});

/**
 * Export router
 */
module.exports = router;
