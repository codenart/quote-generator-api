'use strict';

const Checker = require('type-check');

module.exports = class Quote {
   /**
    * @param quote : String
    * @param author : String
    */
   constructor(quote, author) {
      if(! Checker.typeCheck('String', quote))
         throw new TypeError('"quote" must be String.');
      else if(! Checker.typeCheck('String', author))
         throw new TypeError('"author" must be String.');
      else {
         this.quote = quote;
         this.author = author;
      }
   }
};

