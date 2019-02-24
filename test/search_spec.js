// importing  the words file for  searching
import { search } from '../lib/words';
// importing underscope module
import { each }	from 'underscore';
// importing assert module
import assert from 'assert';
// importing filesystem module to perform file system operations
import fs from 'fs';

// importing file dictionary.json and making a valid json key value pairs
const dictionary = JSON.parse(
  fs.readFileSync('./lib/dictionary.json')
).dictionary;


// making a test case to verify the search result we are getting are authentic
describe('matching underscore', () => {
  it('matches _h', () => {
    const find = '_h';
    const result = search(find, dictionary).result;

    assert.equal(result.length, 7);

    each(result, (match) => {
      assert.equal(match.length, 2);
      assert.equal(match.indexOf('H'), 1);
    }, result);
  });

  it('matches h_', () => {
    const find = 'h_';
    const result = search(find, dictionary).result;

    each(result, (match) => {
      assert.equal(match.length, 2);
      assert.equal(match.indexOf('H'), 0);
    }, result);
  });
});
