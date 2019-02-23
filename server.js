// importing express
import express from 'express';
// importing encrypted body content
import bodyParser from 'body-parser';
// importing filesystem to perform file operations
import fs from 'fs';
// importing words file to perform search operations
import { search } from './lib/words';
// importing app 
const app = express();

// creating a variable named dictionary to parse the json i.e stored in anither file 
const dictionary = JSON.parse(
  fs.readFileSync('./lib/dictionary.json')
).dictionary;

// setting the view to ecmascript
app.set('view engine', 'ejs');

app.set('view options', { layout: false });
// settings the path for static assets
app.use('/public', express.static('public'));

// using body parser
app.use(bodyParser.urlencoded({ extended: true }));
// setting option in body parser to json
app.use(bodyParser.json());


// route for homepage url
app.get('/', (req, res) => {
  res.render('api/index', {
    pattern: '',
    words: [],
    req: req
  });
});


// route for api
app.get('/api', (req, res) => {
  res.render('api/index', {
    pattern: '',
    words: [],
    req: req
  });
});

// api route for searching...
app.get('/api/search', (req, res) => {
  console.log(req.queryString);
  res.render('api/index', {
    pattern: req.query['search-text'],
    words: search(req.query['search-text'], dictionary).result,
    permalink: req.protocol + '://' + req.get('host') + req.originalUrl,
    req: req
  });
});

// post route for search
app.post('/search', function (req, res) {
  res.render('result', {
    words: search(req.body.pattern, dictionary).result,
    pattern: req.body.pattern
  });
});

// settimg port to listen at 3000
app.listen(process.env.PORT || 3000);


// printing the port the server it is listing to on console
console.log('Listening on port: ' + (process.env.PORT || 3000));
