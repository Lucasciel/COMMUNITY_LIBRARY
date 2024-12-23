import db from '../config/database.js';

//criando em SQL: tabela e tipos de dados id, username,email..
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER  PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT 
    )
    `)

function createUseerRepository(newUser) {
    return new Promise((resolve, reject)=> {
        db.run( //local que os dados serão salvos no db
            `
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
            `, //os dados que serão enviados pro db
            [newUser.username, newUser.email, newUser.password, newUser.avatar],
            (err) => {
                if(err) {
                    reject(err)
                } else{
                    resolve({id: this.lastID, ...newUser})
                }
            }
        );
    });
}

export default {
    createUseerRepository
}
