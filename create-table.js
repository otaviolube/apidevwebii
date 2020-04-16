const mysql = require('mysql2');
const faker = require('faker');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3336,
    user: 'root',
    password: 'faesa123',
    database: 'app_development'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Banco de dados Conectado!');
    createTableUsers(connection);
    populateUsers(connection);
});

function createTableUsers(conn){
    const sql = `CREATE TABLE IF NOT EXISTS Users
                   (id INT NOT NULL AUTO_INCREMENT, 
                   nome VARCHAR(200) NOT NULL,
                   email VARCHAR(100) NOT NULL,
                   PRIMARY KEY (id)
                   );`
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela criada com sucesso!')
    })
}

function populateUsers(conn){
    const sql = `INSERT INTO Users(nome, email) VALUES ?`;
    
    let values = [];

    for(let i = 0; i < 10; i++){
        values.push([faker.name.findName(), faker.internet.email()]);
    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros inseridos com sucesso!');
        conn.end();
    });
}