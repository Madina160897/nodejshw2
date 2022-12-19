const http = require("http");
const fs = require("fs");

function handler(request, response) {

    let usersJson = fs.readFileSync("users.json");

    if (request.url === "/users") {
       response.end(usersJson)
    } else if (request.url === "/users/count"){
       const userCount = JSON.parse(usersJson).length;
      response.end(`${userCount}`)
    } else if (request.url.includes("users/delete/")) {
        const userId = +request.url.split('/').reverse()[0];
        const user = JSON.parse(usersJson)
        user.splice(userId - 1, 1);
        response.end(JSON.stringify(user));
     } 
}

http.createServer(handler).listen(3000);