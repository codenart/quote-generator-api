/* global __dirname */

'use strict';

const RequestURLException = require(__dirname + '/../RequestURLException');
const APIException = require(__dirname + '/../APIException');
const Finder = require(__dirname + '/finder');
const Checker = require('type-check');

const express = require('express');
const app = express();

/**
 * 
 * @param request
 * @param response
 */
app.get('/api/quote/random', (request, response) => {
   Finder.getRandomQuote((error, result) => {
      if(error) {
         console.error(error);
         response.json(new APIException());
      }
      else
         if(! Checker.typeCheck('{ quote: String, author: String }', result))
            throw new TypeError('"result" must be Quote');
         else
            response.json(result);
   });
});

/**
 * 
 * @param request
 * @param response
 */
app.get('/api/quote/get', (request, response) => {
   const author = request.query.author;
   if(! Checker.typeCheck('Undefined', author))
      Finder.findQuotesByAuthor(author, (error, result) => {
         if(error) {
            console.error(error);
            response.json(new APIException());
         }
         else
            if(! Checker.typeCheck('Array', result))
               throw new TypeError('"result" must be Array.');
            else
               response.json(result);
      });
   else {
      const format = '/api/quote/get?author=name';
      const samples = [
                         '/api/quote/get?author=*',
                         '/api/quote/get?author=Lao%20Tzu'
                      ];
      const exception = new RequestURLException(format, samples);
      response.json(exception);
   }
});

/**
 * @param request
 * @param response
 */
app.get('*', (request, response) => {
   const format = '/api/quote/action[?param=value]';
   const samples = [
                      '/api/quote/random',
                      '/api/quote/get?author=*',
                      '/api/quote/get?author=Lao%20Tzu'
                   ];
   const exception = new RequestURLException(format, samples);
   response.json(exception);
});

/**
 * Export app
 */
module.exports = app;