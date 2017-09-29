/* global __dirname */

'use strict';

const FileSystem = require('fs');
const Checker = require('type-check');
const Quote = require(__dirname + '/Quote');

class QuoteFinder {
   constructor() {
      this.databasePath = __dirname + '/database.json';
   }
   
   /**
    * @param callback (error, result) : Function
    * @returns result : [Quote]
    */
   getAllQuotes(callback) {
      FileSystem.readFile(this.databasePath, (error, data) => {
         if(error)
            callback(error);
         else {
            const allAuthors = JSON.parse(data);
            const allQuotes = allAuthors.map(author => author.quotes.map(quote => new Quote(quote, author.name)));
            const result = allQuotes.reduce((previousArray, currentArray) => previousArray.concat(currentArray));
            callback(null, result);
         }
      });
   }
   
   /**
    * @param author : String
    * @param callback (error, result) : Function
    * @returns result : [Quote]
    */
   findQuotesByAuthor(author, callback) {
      this.getAllQuotes((error, result) => {
         if(error)
            callback(error);
         else
            if(author === '*')
               callback(null, result);
            else {
               result = result.filter(quote => (quote.author.toLowerCase() === author.toLowerCase()));
               callback(null, result);
            }
      });
   }
   
   /**
    * @param callback (error, result) : Function
    * @return result : Quote
    */
   getRandomQuote(callback) {
      this.getAllQuotes((error, result) => {
         if(error)
            callback(error);
         else
            if(! Checker.typeCheck('Array', result))
               throw new TypeError('"result" must be Array.');
            else {
               var randomIndex = null;
               do {
                  randomIndex = Math.random() * result.length;
                  randomIndex = Math.floor(randomIndex);
               }
               while(randomIndex === result.length);
               callback(null, result[randomIndex]);
            }
      });
   }
}

module.exports = new QuoteFinder();