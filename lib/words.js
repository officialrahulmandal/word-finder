// importing filter and each from loadash library
import { filter, each } from 'lodash';

// function to search word in dictionary 
export function search(word, dictionary) {
  // filter out all the ? and _ from the word
  const exclude = filter(word, w => {
    return w != '?' && w != '_';
  });

  // initialising the tosearch the excludepattern variables with an empty string
  let toSearch = '';
  let excludePattern = '';

  // using the exclude variable and making a new string with the name of 
  each(exclude, c => excludePattern += '^' + c);

  excludePattern = '[' + excludePattern + ']';

  toSearch = '^' + word.replace(/\?/g, excludePattern) + '$';

  toSearch = '^' + toSearch.replace(/\_/g, '[a-z]') + '$';

  if (word.indexOf('/') >= 0) {
    toSearch = word.replace(/\//g, '');
  }

  const result = filter(dictionary, w => {
    return w.match(new RegExp(toSearch, 'i'));
  });

  return {
    result,
    excludePattern,
    searchPattern: toSearch
  };
}
