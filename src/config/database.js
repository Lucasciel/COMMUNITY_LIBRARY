import sqlite3 from 'sqlite3' //banco de dados sql lite

//base de dados/DB
const db = new sqlite3.Database('library_db.sqlite', (err)=> {
    if(err) {
        console.log('Erro ao conectar ao banco de dados:', err.message)
    } else {
        console.log('Conectado com Sucesso ao banco de dados SQLite.')
    }
})

export default db;

