const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const getRequest = (request, response, parsedUrl) => {
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;

    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;

    case '/getUsers':
      jsonHandler.getUsers(request, response);
      break;

    default:
      jsonHandler.getUnreal(request, response);
      break;
  }
};

const headRequest = (request, response, parsedUrl) => {
  switch (parsedUrl.pathname) {
    case '/getUsers':
      jsonHandler.getUsersMeta(request, response);
      break;

    default:
      jsonHandler.getUnrealMeta(request, response);
      break;
  }
};

const postRequest = (request, response, parsedUrl) => {
  const newUser = query.parse(parsedUrl.query);

  switch (parsedUrl.pathname) {
    case '/addUser':
      // Missing fields
      if (newUser.name === '' || newUser.age === '') {
        const responseJSON = {
          id: 'missingParams',
          message: 'Required fields missing',
        };
        const parsedResponse = JSON.stringify(responseJSON);

        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(parsedResponse);
        response.end();
      } else {
        jsonHandler.addUser(request, response, newUser);
      }
      break;

    default:
      response.end();
      break;
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'GET':
      getRequest(request, response, parsedUrl);
      break;

    case 'HEAD':
      headRequest(request, response, parsedUrl);
      break;

    case 'POST':
      postRequest(request, response, parsedUrl);
      break;

    default:
      response.writeHead(501);
      response.end();
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on localhost:${port}...`);
