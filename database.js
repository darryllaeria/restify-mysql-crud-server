// Database specific
'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'mysql', // MySQL username
    password: 'mysql', // MySQL password
    database: 'test'
});
var tableName = 'employee';

// Log database is connected or not
connection.connect(function(err) {
    if(err) {
        console.log("Database connection error");
    } else {
        console.log("Database connected");
    }
});

function handleDisconnect(connection) {
    connection.on('error', function(err) {
        if(!err.fatal) {
            return;
        }

        if(err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
}

handleDisconnect(connection);


/*************** Query Functions ***************/

exports.getEmployeeData = function(param, callback) {
    // Function input parameters
    var queryParam = [
        { 
            employee_no       : param[0]
        },
        {
            sam_account_name  : param[1]
        }
    ];

    var query = connection.query('SELECT * FROM ' + tableName + ' WHERE ? OR ? LIMIT 0, 10', queryParam, callback);

    console.log(query.sql);
}

exports.createEmployeeData = function(param, callback) {
    var queryParam = [
        { 
            employee_no       : param[0],
            sam_account_name  : param[1],
            first_name        : param[2],
            middle_name       : param[3],
            last_name         : param[4],
            display_name      : param[5],
            job_title         : param[6]
        }
    ];

    var query = connection.query('INSERT INTO ' + tableName + ' SET ?', queryParam, callback);
    console.log(query.sql);
}

exports.updateEmployeeData = function(param, callback) {
    var queryParam = [
        {
            sam_account_name  : param[0],
            first_name        : param[1],
            middle_name       : param[2],
            last_name         : param[3],
            display_name      : param[4],
            job_title         : param[5]
        },
        { 
            employee_no       : param[6]
        }
    ];

    var query = connection.query('UPDATE ' + tableName + ' SET ? WHERE ?', queryParam, callback);
    console.log(query.sql);
}

exports.removeEmployeeData = function(param, callback) {
    var queryParam = [
        { 
            employee_no   : param[0]
        }
    ];
    
    var query = connection.query('DELETE FROM ' + tableName + ' WHERE ?', queryParam, callback);

    console.log(query.sql);
}