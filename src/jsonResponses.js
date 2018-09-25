// Data held in memory
const users = {};

const getUsers = (request, response) => {
  const responseJSON = {
    message: JSON.stringify(users),
  };
  const parsedResponse = JSON.stringify(responseJSON);

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(parsedResponse);
  response.end();
};

const getUsersMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

const addUser = (request, response, newUser) => {
  // New user
  if (users[newUser.name] == null) {
    const responseJSON = {
      message: 'User added successfully',
    };
    const parsedResponse = JSON.stringify(responseJSON);

    users[newUser.name] = newUser;
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write(parsedResponse);
    response.end();
  } else { // Updated user
    users[newUser.name] = newUser;
    response.writeHead(204, { 'Content-Type': 'application/json' });
    response.end();
  }
};

const getUnreal = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you were looking for was not found',
  };
  const parsedResponse = JSON.stringify(responseJSON);

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(parsedResponse);
  response.end();
};

const getUnrealMeta = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports.getUsers = getUsers;
module.exports.getUsersMeta = getUsersMeta;
module.exports.addUser = addUser;
module.exports.getUnreal = getUnreal;
module.exports.getUnrealMeta = getUnrealMeta;
