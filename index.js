const fs = require('fs');
const url = require('url');
const http = require('http');
const replaceCards = require('./functions');




const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'UTF-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'UTF-8');
const tempAnimal = fs.readFileSync(`${__dirname}/templates/template-animal.html`, 'UTF-8');

// console.log(tempCard);


const data = fs.readFileSync(`${__dirname}/data/data.json`, 'UTF-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);


  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj.map(el => replaceCards(tempCard, el)).join('');
    
    let output = tempOverview.replace('{%ANIMAL_CARD%}', cardsHtml);


    res.end(output);
  } else if (pathname === '/details') {
    res.writeHead(200, {'Content-type': 'text/html'});
   
    const animal = dataObj[query.id];

    const output = replaceCards(tempAnimal, animal);
    res.end(output);

  } else if (pathname === '/api') {


    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {'Content-type': 'text/html'});
    res.end('<h3>Page not found!</h3>');
  }

});


const port = 3000;

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
}) 