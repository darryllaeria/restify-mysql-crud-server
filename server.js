'use strict';

var restify = require('restify');
var database = require('./database');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

// Create server
var server = restify.createServer ({
  name: "restify-server"
});

// Initialize restify plugins
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get('/get', getEmployee);
server.post('/create', createEmployee);
server.put('/update', updateEmployee);
server.del('/remove', removeEmployee);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

/*************** Function Declaration ***************/

// Retrieve employee data
function getEmployee(req, res) {
  // Use query parser to retrieve field data from request
  var fields = [
    req.query.employee_no,
    req.query.sam_account_name
  ];

  database.getEmployeeData(
    fields, 
    function (err, result) { return err ? res.send(err) : res.json(result); }
  );
  console.log(fields);
}

// Create an employee record
function createEmployee(req, res) {
  var fields = [
    req.query.employee_no,
    req.query.sam_account_name,
    req.query.first_name,
    req.query.middle_name,
    req.query.last_name,
    req.query.display_name,
    req.query.job_title
  ];

  database.createEmployeeData(
    fields, 
    function(err, result) { return err ? res.send(err) : res.json(result); }
  );
  console.log(fields);
}

// Update an employee record
function updateEmployee(req, res) {
  var fields = [
    req.query.sam_account_name,
    req.query.first_name,
    req.query.middle_name,
    req.query.last_name,
    req.query.display_name,
    req.query.job_title,
    
    req.query.employee_no // Employee No is primary key used for update
  ];

  database.updateEmployeeData(
    fields, 
    function(err, result) { return err ? res.send(err) : res.json(result); }
  );
  console.log(fields);
}

// Remove an employee record
function removeEmployee(req, res) {
  var fields = [
    req.query.employee_no
  ];

  database.removeEmployeeData(
    fields, 
    function(err, result) { return err ? res.send(err) : res.json(result); }
  );
  console.log(fields);
}