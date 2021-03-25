#!/usr/bin/env node

const { exec }  = require('child_process');
const url = require('url');
const http = require('http');
const app = http.createServer((request, response) => {
  var parserin, parserout, result;
  var query = url.parse(request.url, true).query;

  if (query.parserin) parserin = query.parserin;
  else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write( `result missing in variables error from parserin`);
    response.end();
    console.log("error: missing variables 1");
    return;
  }
  if (query.parserout) parserout = query.parserout;
  else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write( `the ${parserin} result missing out variables parserout`);
    response.end();
    console.log("error: missing variables 2");
    return;
  }
  exec(`yarrrml-parser -i ${parserin} -o ${parserout}`, (error, stdout, stderr) => {
    
    if (error) {
        response.writeHead(200, {"Content-Type": "text/html"});
        //response.write( "command returned an error", 'utf8', () => { response.end(); });       
        response.end("command returned an error");
        return;
    }
    if (stderr) {
        response.writeHead(200, {"Content-Type": "text/html"});
        //response.write( "command returned an stderror", 'utf8', () => { response.end(); });         
        response.end("command returned a stderror");
        return;
    }
    console.log(`stdout: ${stdout}`);
    //result = stdout;
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  //response.write(result);
  response.end( `yarrrml-parser -i ${parserin} -o ${parserout}`);       

  //response.write(`yarrrml-parser -i ${parserin} -o ${parserout}`);
  //response.end();
});

app.listen(3000);

