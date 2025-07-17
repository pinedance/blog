/*!
 * Lunr N-gram Tokenizer for Non-Alphabetic Languages
 * Provides bigram and trigram tokenization for better search in Korean, Chinese, Japanese
 * 
 * Copyright 2025
 * Licensed under the MIT License
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory)
    } else if (typeof exports === 'object') {
        /**
         * Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node.
         */
        module.exports = factory()
    } else {
        // Browser globals (root is window)
        factory()(root.lunr);
    }
}(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function (lunr) {
        /* throw error if lunr is not yet included */
        if ('undefined' === typeof lunr) {
            throw new Error('Lunr is not present. Please include / require Lunr before this script.');
        }

        var isLunr2 = lunr.version[0] == "2";

        /* register specific ngram function */
        lunr.ngram = function () {
            this.pipeline.reset();
            this.pipeline.add(
                lunr.ngram.trimmer,
                lunr.ngram.processor
            );

            // Replace the tokenizer with n-gram tokenizer
            if (isLunr2) {
                this.tokenizer = lunr.ngram.tokenizer;
            } else {
                if (lunr.tokenizer) {
                    lunr.tokenizer = lunr.ngram.tokenizer;
                }
                if (this.tokenizerFn) {
                    this.tokenizerFn = lunr.ngram.tokenizer;
                }
            }

            // Add to search pipeline if it exists
            if (this.searchPipeline) {
                this.searchPipeline.reset();
                this.searchPipeline.add(
                    lunr.ngram.trimmer,
                    lunr.ngram.processor
                );
            }
        };

        /* lunr trimmer function */
        lunr.ngram.wordCharacters = "\\w\\u0080-\\uFFFF";
        lunr.ngram.trimmer = function (token) {
            return token.update(function (str) {
                return str.replace(/^[^\w\u0080-\uFFFF]+/, '')
                         .replace(/[^\w\u0080-\uFFFF]+$/, '');
            });
        };
        lunr.Pipeline.registerFunction(lunr.ngram.trimmer, 'trimmer-ngram');

        /**
         * Check if a character is non-alphabetic (anything other than A-Z, a-z)
         * @param {string} char - Character to check
         * @returns {boolean} True if character is non-alphabetic
         */
        lunr.ngram.isNonAlphabetic = function(char) {
            // Return true for anything that's not basic English alphabet
            return !/[A-Za-z]/.test(char);
        };

        /**
         * Generate bigram tokens from a string
         * @param {string} str - Input string
         * @returns {Array} Array of bigram tokens
         */
        lunr.ngram.bigram = function(str) {
            var tokens = [];
            if (!str || str.length < 2) return tokens;
            
            for (var i = 0; i < str.length - 1; i++) {
                var bigram = str.substring(i, i + 2);
                // Only create n-gram if it contains non-alphabetic characters
                if (lunr.ngram.containsNonAlphabetic(bigram)) {
                    tokens.push(bigram);
                }
            }
            return tokens;
        };

        /**
         * Generate trigram tokens from a string
         * @param {string} str - Input string
         * @returns {Array} Array of trigram tokens
         */
        lunr.ngram.trigram = function(str) {
            var tokens = [];
            if (!str || str.length < 3) return tokens;
            
            for (var i = 0; i < str.length - 2; i++) {
                var trigram = str.substring(i, i + 3);
                // Only create n-gram if it contains non-alphabetic characters
                if (lunr.ngram.containsNonAlphabetic(trigram)) {
                    tokens.push(trigram);
                }
            }
            return tokens;
        };

        /**
         * Check if a string contains non-alphabetic characters
         * @param {string} str - String to check
         * @returns {boolean} True if string contains non-alphabetic characters
         */
        lunr.ngram.containsNonAlphabetic = function(str) {
            for (var i = 0; i < str.length; i++) {
                if (lunr.ngram.isNonAlphabetic(str[i])) {
                    return true;
                }
            }
            return false;
        };

        /* n-gram tokenizer function */
        lunr.ngram.tokenizer = function (obj) {
            if (!arguments.length || obj == null || obj == undefined) return [];
            
            if (Array.isArray(obj)) {
                return obj.map(function (t) {
                    return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase();
                });
            }

            var str = obj.toString().toLowerCase();
            var tokens = [];
            
            // Use default tokenizer to get initial tokens
            var defaultTokenizer = lunr.tokenizer || function(str) {
                return str.toString().trim().toLowerCase().split(/\s+/);
            };
            
            var originalTokens = defaultTokenizer(str);
            
            // Add original tokens
            for (var i = 0; i < originalTokens.length; i++) {
                var token = originalTokens[i];
                if (isLunr2) {
                    if (typeof token === 'string') {
                        tokens.push(new lunr.Token(token, {
                            position: [0, token.length],
                            index: tokens.length
                        }));
                    } else {
                        tokens.push(token);
                    }
                } else {
                    tokens.push(typeof token === 'string' ? token : token.toString());
                }
            }
            
            // Process each original token for n-gram generation
            for (var i = 0; i < originalTokens.length; i++) {
                var token = originalTokens[i];
                var tokenStr = typeof token === 'string' ? token : token.toString();
                
                // Generate bigrams
                var bigrams = lunr.ngram.bigram(tokenStr);
                for (var j = 0; j < bigrams.length; j++) {
                    if (isLunr2) {
                        tokens.push(new lunr.Token(bigrams[j], {
                            position: [0, bigrams[j].length],
                            index: tokens.length
                        }));
                    } else {
                        tokens.push(bigrams[j]);
                    }
                }
                
                // Generate trigrams
                var trigrams = lunr.ngram.trigram(tokenStr);
                for (var j = 0; j < trigrams.length; j++) {
                    if (isLunr2) {
                        tokens.push(new lunr.Token(trigrams[j], {
                            position: [0, trigrams[j].length],
                            index: tokens.length
                        }));
                    } else {
                        tokens.push(trigrams[j]);
                    }
                }
            }
            
            return tokens;
        };

        /**
         * Pipeline function for n-gram processing
         * Can be added to lunr pipeline for automatic n-gram generation
         */
        lunr.ngram.processor = function(token) {
            var str = token.toString();
            
            // Return original token if it doesn't contain non-alphabetic characters
            if (!lunr.ngram.containsNonAlphabetic(str)) {
                return token;
            }
            
            // For tokens with non-alphabetic characters, return the token as-is
            // The n-gram generation is handled by the tokenizer
            return token;
        };

        // Register the n-gram processor as a pipeline function
        lunr.Pipeline.registerFunction(lunr.ngram.processor, 'ngramProcessor');
    };
}));