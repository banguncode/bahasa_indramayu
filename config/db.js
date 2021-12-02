let mysql = require('mysql');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_bahasa_indramayu'
});

db.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!');
    }
})

module.exports = db;